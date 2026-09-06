import Link from "next/link";
import { ArrowRight } from "lucide-react";
export function SectionHeading({ eyebrow, title, href = "/recipes" }: { eyebrow: string; title: string; href?: string }) { return <div className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow">{eyebrow}</p><h2 className="display mt-2 text-4xl font-bold sm:text-5xl">{title}</h2></div><Link href={href} className="hidden items-center gap-2 text-sm font-bold text-[#287a55] sm:flex">View all <ArrowRight size={16} /></Link></div> }
