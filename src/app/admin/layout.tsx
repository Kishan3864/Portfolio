import type { Metadata } from "next";

// Keep the admin area out of search engines.
export const metadata: Metadata = {
  title: "Admin · Kishan Patel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The public site is dark; `.admin-light` restores the original light
  // styling for the dashboard (see globals.css).
  return <div className="admin-light flex-1">{children}</div>;
}
