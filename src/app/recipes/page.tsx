import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { getPublishedRecipes } from "@/lib/queries";

const archiveMetadata: Metadata = { title: "Healthy Recipes", description: "Browse easy, healthy recipes for quick dinners, high-protein meals, breakfast, meal prep, and more.", alternates: { canonical: "/recipes" } };

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const q = (await searchParams).q?.trim();
  return q ? { title: `Search results for “${q}”`, robots: { index: false, follow: true }, alternates: { canonical: "/recipes" } } : archiveMetadata;
}

export default async function RecipesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [allRecipes, query] = await Promise.all([getPublishedRecipes(), searchParams]);
  const q = query.q?.trim() || "";
  const needle = q.toLocaleLowerCase();
  const recipes = needle ? allRecipes.filter((recipe) => [recipe.title, recipe.description, recipe.category.name, ...recipe.tags, ...recipe.ingredients].some((value) => value.toLocaleLowerCase().includes(needle))) : allRecipes;
  return <div className="container-site py-16">
    <p className="eyebrow">Fresh ideas for every day</p><h1 className="display mt-3 text-5xl font-bold sm:text-6xl">Healthy recipes</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#5d7168]">Approachable, tested recipes with plenty of flavor and practical nutrition.</p>
    <form id="recipe-search" role="search" className="mt-8 flex max-w-2xl gap-2 scroll-mt-6"><label className="relative flex-1"><span className="sr-only">Search recipes</span><Search aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687a71]" size={19}/><input name="q" defaultValue={q} placeholder="Search by recipe, ingredient, or category" className="h-12 w-full rounded-xl border border-[#cad7cc] bg-white pl-11 pr-4 outline-none focus:border-[#287a55] focus:ring-2 focus:ring-[#bfe0c8]" /></label><button className="rounded-xl bg-[#287a55] px-6 font-bold text-white hover:bg-[#1f6545]">Search</button></form>
    {q && <p className="mt-5 text-sm text-[#5d7168]">{recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} found for <strong>“{q}”</strong>. <Link className="font-bold text-[#287a55] underline" href="/recipes">Clear search</Link></p>}
    <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{recipes.map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div>
    {recipes.length === 0 && <div className="mt-12 rounded-2xl bg-[#f1f5ed] p-8"><h2 className="display text-3xl font-bold">No recipes found</h2><p className="mt-3 text-[#5d7168]">Try a broader term such as chicken, breakfast, or meal prep.</p></div>}
  </div>;
}
