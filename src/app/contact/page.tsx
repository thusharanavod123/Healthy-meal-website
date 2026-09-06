import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = { title: "Contact", description: "Contact the FreshTable editorial team.", alternates: { canonical: "/contact" } };
export default function ContactPage() { return <div className="container-site grid gap-12 py-16 lg:grid-cols-2"><div><p className="eyebrow">Get in touch</p><h1 className="display mt-3 text-6xl font-bold">We’d love to hear from you.</h1><p className="mt-6 max-w-md leading-7 text-[#5c7166]">Questions, recipe feedback, or partnership inquiries? Send a note to hello@freshtable.com or use this form.</p></div><ContactForm /></div> }
