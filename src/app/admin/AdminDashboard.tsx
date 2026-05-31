"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, LogOut, X, Inbox, RefreshCw, Mail, Eye } from "lucide-react";
import { profile } from "@/lib/profile";

export type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminDashboard({ initial }: { initial: Contact[] }) {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>(initial);
  const [viewing, setViewing] = useState<Contact | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/contacts", { cache: "no-store" });
    setBusy(false);
    if (res.ok) {
      const d = await res.json();
      setContacts(d.contacts);
    } else {
      setError("Could not refresh.");
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this message permanently?")) return;
    setError("");
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setContacts((c) => c.filter((x) => x.id !== id));
      setViewing((v) => (v && v.id === id ? null : v));
    } else {
      setError("Could not delete. Please try again.");
    }
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
                    onClick={() => setViewing(c)}
                    className="border-b border-slate-100 hover:bg-slate-50/60 align-top cursor-pointer"
                  >
                    <td className="px-4 py-3 text-slate-400">{c.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      {c.email}
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-sm">
                      <span className="line-clamp-2 whitespace-pre-wrap">
                        {c.message}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {formatDate(c.created_at)}
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewing(c)}
                          aria-label="View"
                          className="grid place-items-center w-8 h-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          <Eye size={16} />
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

      {/* Read-only view of a single message */}
      {viewing && (
        <ViewModal
          contact={viewing}
          onClose={() => setViewing(null)}
          onDelete={() => remove(viewing.id)}
        />
      )}
    </main>
  );
}

// Open Gmail's web compose from YOUR Gmail account (profile.email) instead of a
// plain mailto: (which would use the device's default mail account). `authuser`
// pins the sending account, so replies always come from kishan3864@gmail.com.
function gmailReplyUrl(to: string): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    authuser: profile.email,
    to,
    su: "Re: your message",
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
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

function ViewModal({
  contact,
  onClose,
  onDelete,
}: {
  contact: Contact;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40"
      onClick={onClose}
    >
      <div className="glass w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Message</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid place-items-center w-8 h-8 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-slate-500">Name</dt>
            <dd className="text-slate-900 font-medium">{contact.name}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd>
              <a
                href={gmailReplyUrl(contact.email)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 font-medium inline-flex items-center gap-1 hover:underline"
              >
                <Mail size={14} /> {contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Received</dt>
            <dd className="text-slate-700">{formatDate(contact.created_at)}</dd>
          </div>
          <div>
            <dt className="text-slate-500 mb-1">Message</dt>
            <dd className="text-slate-800 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto bg-slate-50 border border-slate-200 p-3">
              {contact.message}
            </dd>
          </div>
        </dl>

        <div className="flex justify-end gap-2 mt-6">
          <a
            href={gmailReplyUrl(contact.email)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold"
          >
            <Mail size={15} />
            <span>Reply</span>
          </a>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-red-600 border border-red-300 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={15} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
