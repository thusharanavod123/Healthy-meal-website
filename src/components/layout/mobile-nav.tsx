"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  return <>
    <button type="button" className="focus-ring rounded-full p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
      {open ? <X size={22} /> : <Menu size={22} />}
    </button>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-0 top-20 z-50 grid gap-1 border-b border-[#e0e8e1] bg-white px-4 py-4 text-sm font-bold shadow-lg lg:hidden">
      {links.map((link) => <Link key={link.href} href={link.href} className="rounded-lg px-4 py-3 hover:bg-[#eff7f1] hover:text-[#287a55]">{link.label}</Link>)}
    </nav>}
  </>;
}
