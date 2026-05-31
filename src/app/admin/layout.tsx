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
  return <>{children}</>;
}
