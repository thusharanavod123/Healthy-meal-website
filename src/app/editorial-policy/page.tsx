import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Editorial Policy", description: "How FreshTable develops, reviews, updates, and corrects healthy recipe content and nutrition estimates.", alternates: { canonical: "/editorial-policy" } };

export default function EditorialPolicyPage() {
  return <LegalPage eyebrow="How we work" title="Editorial Policy">
    <p>FreshTable publishes practical recipes for everyday home cooks. Our goal is to make each recipe clear, useful, and honest about what readers can expect.</p>
    <h2>Recipe development and review</h2><p>Recipes are reviewed before publication for complete ingredient lists, understandable steps, realistic timing, food-safety guidance, and consistency between the written recipe and its accompanying information. We do not claim that a recipe was kitchen-tested unless it was actually prepared and evaluated.</p>
    <h2>Nutrition information</h2><p>Nutrition values are estimates calculated from available ingredient data. Brands, substitutions, serving sizes, and preparation methods can change the result. Nutrition information is general information, not medical advice; see our <Link href="/disclaimer">nutrition disclaimer</Link>.</p>
    <h2>Accuracy, updates, and corrections</h2><p>We update content when we find unclear instructions, factual errors, or information that no longer serves readers. Published and updated dates are shown on recipe pages. To report a possible error, please <Link href="/contact">contact FreshTable</Link> with the recipe URL and details.</p>
    <h2>AI-assisted work</h2><p>Digital tools, including AI-assisted tools, may support outlining, editing, or administrative work. Content is reviewed by a person before publication. These tools do not replace editorial responsibility, and we do not use them to invent testing, credentials, ratings, or reader experiences.</p>
    <h2>Images, sources, and commercial content</h2><p>We aim to use original or appropriately licensed images. When outside factual sources materially inform an article, they should be identified where useful. Sponsored or affiliate relationships will be clearly disclosed and do not purchase favorable editorial conclusions.</p>
  </LegalPage>;
}
