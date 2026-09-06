import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import { Analytics } from "@/components/analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://freshtable.com";
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: "FreshTable | Healthy Recipes for Real Life", template: "%s | FreshTable" }, description: "Simple, nutritious recipes for busy people—high-protein meals, quick dinners, meal prep, and healthy breakfasts.", alternates: { canonical: "/" }, openGraph: { type: "website", siteName: "FreshTable", title: "FreshTable | Healthy Recipes for Real Life", description: "Simple, nourishing recipes made for real life.", images: [{ url: "/images/lemon-herb-chicken-bowl.png", width: 1584, height: 1024 }] } };
const schemas = [{ "@context": "https://schema.org", "@type": "Organization", name: "FreshTable", url: siteUrl }, { "@context": "https://schema.org", "@type": "WebSite", name: "FreshTable", url: siteUrl, potentialAction: { "@type": "SearchAction", target: `${siteUrl}/recipes?q={search_term_string}`, "query-input": "required name=search_term_string" } }];
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en-US"><body><Header /><main>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} /><Analytics /></body></html> }
