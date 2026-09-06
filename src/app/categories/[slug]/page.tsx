import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { getCategories, getRecipesByCategory } from "@/lib/queries";
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getCategories()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const category = (await getCategories()).find(c => c.slug === slug); if (!category) return {}; return { title: `${category.name} Recipes`, description: category.description, alternates: { canonical: `/categories/${slug}` } }; }
export default async function CategoryPage({ params }: Props) { const { slug } = await params; const [categories, displayRecipes] = await Promise.all([getCategories(), getRecipesByCategory(slug)]); const category = categories.find(c => c.slug === slug); if (!category) notFound(); return <div><div className="bg-[#f1f5ed] py-16"><div className="container-site"><p className="eyebrow">Recipe collection</p><h1 className="display mt-3 text-5xl font-bold sm:text-6xl">{category.name}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-[#5d7168]">{category.description}</p></div></div><div className="container-site py-14"><div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{displayRecipes.map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div></div></div> }
