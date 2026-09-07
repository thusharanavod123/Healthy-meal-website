import type { Recipe } from "@/types/content";

export function isoDuration(minutes: number) {
  const safeMinutes = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safeMinutes / 60);
  const remainder = safeMinutes % 60;
  return `PT${hours ? `${hours}H` : ""}${remainder || !hours ? `${remainder}M` : ""}`;
}

export function absoluteUrl(path: string, siteUrl: string) {
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

export function buildRecipeSchema(recipe: Recipe, siteUrl: string) {
  const url = absoluteUrl(`/recipes/${recipe.slug}`, siteUrl);
  return {
    "@context": "https://schema.org", "@type": "Recipe", "@id": `${url}#recipe`, mainEntityOfPage: url,
    name: recipe.title, description: recipe.description, image: [absoluteUrl(recipe.image, siteUrl)],
    author: { "@type": "Person", name: recipe.author }, datePublished: recipe.publishedAt, dateModified: recipe.updatedAt,
    prepTime: isoDuration(recipe.prepMinutes), cookTime: isoDuration(recipe.cookMinutes), totalTime: isoDuration(recipe.prepMinutes + recipe.cookMinutes),
    recipeYield: `${recipe.servings} servings`, recipeCategory: recipe.category.name,
    ...(recipe.tags.length ? { keywords: recipe.tags.join(", ") } : {}),
    nutrition: { "@type": "NutritionInformation", calories: `${recipe.calories} calories`, proteinContent: `${recipe.protein} g`, carbohydrateContent: `${recipe.carbs} g`, fatContent: `${recipe.fat} g` },
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text }))
  };
}

export function buildFaqSchema(faqs: Recipe["faqs"]) {
  if (!faqs.length) return null;
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
}
