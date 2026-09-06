import { RecipeForm } from "@/components/admin/recipe-form";
export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <><p className="eyebrow">Recipes</p><h1 className="mt-2 text-3xl font-bold">Edit recipe</h1><div className="mt-8 max-w-4xl"><RecipeForm recipeSlug={id} /></div></> }
