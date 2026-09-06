import type { Metadata } from "next";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { recipes } from "@/lib/content";
export const metadata: Metadata = { title: "Healthy Recipes", description: "Browse easy, healthy recipes for quick dinners, high-protein meals, breakfast, meal prep, and more.", alternates: { canonical: "/recipes" } };
export default function RecipesPage() { return <div className="container-site py-16"><p className="eyebrow">Fresh ideas for every day</p><h1 className="display mt-3 text-5xl font-bold sm:text-6xl">Healthy recipes</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#5d7168]">Approachable, tested recipes with plenty of flavor and practical nutrition.</p><div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{recipes.map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div></div> }
