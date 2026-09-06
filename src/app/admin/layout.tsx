import type { Metadata } from "next"; import { AdminNav } from "@/components/admin/admin-nav";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <div className="grid min-h-screen bg-[#f5f6f3] lg:grid-cols-[240px_1fr]"><AdminNav /><div className="min-w-0 p-5 sm:p-8 lg:p-12">{children}</div></div> }
