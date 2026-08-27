"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Login failed.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={submit} className="glass w-full max-w-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="grid place-items-center w-10 h-10 btn-gradient text-white">
            <ShieldCheck size={20} />
          </span>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Admin Login</h1>
            <p className="text-xs text-slate-500">Kishan Patel · Portfolio</p>
          </div>
        </div>

        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          placeholder="Enter admin password"
          className="w-full px-4 py-2.5 border border-slate-300 bg-white text-slate-900 focus:border-slate-500 focus:outline-none"
        />

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <button
          type="submit"
          disabled={busy || !password}
          className="btn-gradient w-full mt-5 py-2.5 font-semibold disabled:opacity-60"
        >
          <span>{busy ? "Signing in…" : "Sign in"}</span>
        </button>
      </form>
    </main>
  );
}
