import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { getCategories, getRecipesByCategory } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() { return (await getCategories()).map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategories()).find((item) => item.slug === slug);
  if (!category) return { robots: { index: false, follow: false } };
  const title = category.seoTitle || `${category.name} Recipes`;
  const description = category.metaDescription || category.description;
  return { title, description, alternates: { canonical: `/categories/${slug}` }, openGraph: { type: "website", siteName: "FreshTable", title, description, url: `/categories/${slug}` }, twitter: { card: "summary_large_image", title, description } };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [categories, displayRecipes] = await Promise.all([getCategories(), getRecipesByCategory(slug)]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const siteUrl = getSiteUrl();
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Recipes", item: `${siteUrl}/recipes` },
    { "@type": "ListItem", position: 3, name: category.name, item: `${siteUrl}/categories/${category.slug}` }
  ] };
  const relatedCategories = categories.filter((item) => item.slug !== slug).slice(0, 4);
  return <div>
    <div className="bg-[#f1f5ed] py-16"><div className="container-site"><nav aria-label="Breadcrumb" className="mb-7 text-xs font-bold text-[#6e8177]"><Link href="/">Home</Link><span aria-hidden> / </span><Link href="/recipes">Recipes</Link><span aria-hidden> / </span>{category.name}</nav><p className="eyebrow">Recipe collection</p><h1 className="display mt-3 text-5xl font-bold sm:text-6xl">{category.name} recipes</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#5d7168]">{category.description}</p></div></div>
    <div className="container-site py-14">{displayRecipes.length ? <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{displayRecipes.map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div> : <p className="rounded-2xl bg-[#f7f6ef] p-8 text-[#5d7168]">New {category.name.toLocaleLowerCase()} recipes are coming soon. Browse another healthy recipe collection below.</p>}
      <aside className="mt-16 border-t border-[#dfe7df] pt-10" aria-labelledby="more-collections"><h2 id="more-collections" className="display text-3xl font-bold">Explore more healthy recipe collections</h2><div className="mt-5 flex flex-wrap gap-3">{relatedCategories.map((item) => <Link className="rounded-full border border-[#cad7cc] px-4 py-2 text-sm font-bold hover:border-[#287a55] hover:text-[#287a55]" key={item.slug} href={`/categories/${item.slug}`}>{item.name}</Link>)}</div></aside>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />
  </div>;
}
