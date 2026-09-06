import { AdminNav } from "@/components/admin/admin-nav";
export function AdminShell({ children }: { children: React.ReactNode }) { return <div className="grid min-h-screen bg-[#f5f6f3] lg:grid-cols-[240px_1fr]"><AdminNav /><div className="min-w-0 p-5 sm:p-8 lg:p-12">{children}</div></div> }
