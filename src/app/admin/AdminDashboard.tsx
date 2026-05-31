"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, LogOut, X, Inbox, RefreshCw, Mail } from "lucide-react";

export type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type FormState = { name: string; email: string; message: string };
const EMPTY: FormState = { name: "", email: "", message: "" };

type ModalState =
  | null
  | { mode: "add" }
  | { mode: "edit"; contact: Contact };

export default function AdminDashboard({ initial }: { initial: Contact[] }) {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>(initial);
  const [modal, setModal] = useState<ModalState>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setBusy(true);
    const res = await fetch("/api/admin/contacts", { cache: "no-store" });
    setBusy(false);
    if (res.ok) {
      const d = await res.json();
      setContacts(d.contacts);
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this message permanently?")) return;
    setError("");
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setContacts((c) => c.filter((x) => x.id !== id));
    } else {
      setError("Could not delete. Please try again.");
    }
  }

  async function save(form: FormState, id?: number) {
    setBusy(true);
    setError("");
    const res = await fetch(
      id ? `/api/admin/contacts/${id}` : "/api/admin/contacts",
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok || !d.ok) {
      setError(d.error || "Could not save.");
      return;
    }
    if (id) {
      setContacts((c) => c.map((x) => (x.id === id ? d.contact : x)));
    } else {
      setContacts((c) => [d.contact, ...c]);
    }
    setModal(null);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-10 h-10 btn-gradient text-white">
            <Inbox size={20} />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Contact <span className="gradient-text">Messages</span>
            </h1>
            <p className="text-xs text-slate-500">{contacts.length} total</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            disabled={busy}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 border border-slate-300 hover:bg-slate-100 transition-colors disabled:opacity-60"
          >
            <RefreshCw size={15} className={busy ? "animate-spin" : ""} /> Refresh
          </button>
          <button
            onClick={() => {
              setError("");
              setModal({ mode: "add" });
            }}
            className="btn-gradient inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-2.5 text-sm text-red-700 bg-red-50 border border-red-200">
          {error}
        </div>
      )}

      {/* List */}
      {contacts.length === 0 ? (
        <div className="glass p-12 text-center text-slate-500">
          <Inbox size={40} className="mx-auto mb-3 text-slate-300" />
          No messages yet.
        </div>
      ) : (
        <div className="glass overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-3 font-medium">#</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Message</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Received</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-100 hover:bg-slate-50/60 align-top"
                  >
                    <td className="px-4 py-3 text-slate-400">{c.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      <a
                        href={`mailto:${c.email}`}
                        className="inline-flex items-center gap-1 hover:text-slate-900"
                      >
                        <Mail size={13} /> {c.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-sm">
                      <span className="line-clamp-3 whitespace-pre-wrap">
                        {c.message}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {formatDate(c.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setError("");
                            setModal({ mode: "edit", contact: c });
                          }}
                          aria-label="Edit"
                          className="grid place-items-center w-8 h-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => remove(c.id)}
                          aria-label="Delete"
                          className="grid place-items-center w-8 h-8 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit modal */}
      {modal && (
        <ContactModal
          mode={modal.mode}
          initial={modal.mode === "edit" ? modal.contact : EMPTY}
          busy={busy}
          onClose={() => setModal(null)}
          onSave={(form) =>
            save(form, modal.mode === "edit" ? modal.contact.id : undefined)
          }
        />
      )}
    </main>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

const inputCls =
  "w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:border-slate-500 focus:outline-none";

function ContactModal({
  mode,
  initial,
  busy,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  initial: FormState;
  busy: boolean;
  onClose: () => void;
  onSave: (form: FormState) => void;
}) {
  const [form, setForm] = useState<FormState>({
    name: initial.name,
    email: initial.email,
    message: initial.message,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40"
      onClick={onClose}
    >
      <div
        className="glass w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            {mode === "add" ? "Add message" : "Edit message"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid place-items-center w-8 h-8 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1.5">Name</span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputCls}
              required
              maxLength={120}
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1.5">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputCls}
              required
              maxLength={200}
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1.5">Message</span>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className={`${inputCls} resize-y`}
              required
              maxLength={5000}
            />
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 border border-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="btn-gradient px-5 py-2 text-sm font-semibold disabled:opacity-60"
            >
              <span>{busy ? "Saving…" : "Save"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
