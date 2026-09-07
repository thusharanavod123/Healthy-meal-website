import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Analytics } from "@/components/analytics";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const title = "FreshTable | Easy Healthy Recipes for Everyday Life";
const description = "Easy, healthy recipes made for real life. Discover quick dinners, high-protein meals, meal-prep ideas, healthy breakfasts, air fryer recipes, and more.";
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: title, template: "%s | FreshTable" }, description, applicationName: "FreshTable", category: "food", alternates: { canonical: "/" }, verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined }, icons: { icon: "/icon.svg", apple: "/icon.svg" }, manifest: "/manifest.webmanifest", openGraph: { type: "website", siteName: "FreshTable", title, description, url: "/", locale: "en_US", images: [{ url: "/images/lemon-herb-chicken-bowl.png", width: 1584, height: 1024, alt: "Lemon herb chicken quinoa bowl with roasted vegetables" }] }, twitter: { card: "summary_large_image", title, description, images: ["/images/lemon-herb-chicken-bowl.png"] } };
const schemas = [{ "@context": "https://schema.org", "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "FreshTable", url: siteUrl, logo: `${siteUrl}/icon.svg`, description }, { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "FreshTable", url: siteUrl, publisher: { "@id": `${siteUrl}/#organization` }, potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/recipes?q={search_term_string}` }, "query-input": "required name=search_term_string" } }];
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en-US"><body><Header /><main>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} /><Analytics /></body></html> }
