import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { pool } from "@/lib/db";
import AdminDashboard, { type Contact } from "./AdminDashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const { rows } = await pool.query(
    "SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC"
  );

  // Serialize to plain JSON-safe objects for the client component.
  const contacts: Contact[] = rows.map((r) => ({
    id: Number(r.id),
    name: r.name,
    email: r.email,
    message: r.message,
    created_at: new Date(r.created_at).toISOString(),
  }));

  return <AdminDashboard initial={contacts} />;
}
