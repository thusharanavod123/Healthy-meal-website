import type { Category, Recipe } from "@/types/content";

export const categories: Category[] = [
  { name: "High Protein", slug: "high-protein", description: "Satisfying, protein-forward meals for busy days." },
  { name: "Quick Dinners", slug: "quick-dinners", description: "Wholesome dinners ready in 30 minutes or less." },
  { name: "Air Fryer", slug: "air-fryer", description: "Crisp, lighter favorites made easy in the air fryer." },
  { name: "Meal Prep", slug: "meal-prep", description: "Make-ahead meals that keep healthy eating simple." },
  { name: "Healthy Breakfasts", slug: "healthy-breakfasts", description: "Bright, energizing starts to your day." },
  { name: "Budget Meals", slug: "budget-meals", description: "Nutritious recipes that are kind to your grocery budget." }
];

const base = {
  image: "/images/lemon-herb-chicken-bowl.png", imageAlt: "Lemon herb chicken bowl with quinoa and vegetables", author: "Maya Bennett",
  publishedAt: "2026-08-18", updatedAt: "2026-09-02", prepMinutes: 15, cookMinutes: 20, servings: 4,
  calories: 445, protein: 42, carbs: 38, fat: 16, tags: ["chicken", "weeknight", "gluten-free"], status: "published" as const,
  ingredients: ["1 ½ lb boneless, skinless chicken breasts", "1 cup dry quinoa, rinsed", "4 cups broccoli florets", "1 pint cherry tomatoes", "1 avocado, sliced", "2 lemons", "2 tbsp extra-virgin olive oil", "2 garlic cloves, minced", "¼ cup chopped fresh parsley", "Kosher salt and black pepper"],
  instructions: ["Cook quinoa according to package directions. Fluff and keep warm.", "Heat oven to 425°F. Toss broccoli with half the oil, salt, and pepper; roast for 16–18 minutes.", "Season chicken with garlic, lemon zest, salt, and pepper. Sear in the remaining oil over medium-high heat for 5–7 minutes per side, until it reaches 165°F.", "Rest chicken for 5 minutes, then slice. Divide quinoa, broccoli, tomatoes, and avocado among bowls.", "Whisk lemon juice with parsley and any pan juices. Spoon over each bowl and serve."],
  tips: ["Pound the chicken to an even thickness so it cooks uniformly.", "Cool the quinoa before storing to keep meal-prep bowls fresh.", "Add the avocado just before serving."],
  faqs: [{ question: "Can I make these bowls ahead?", answer: "Yes. Store chicken, quinoa, and vegetables in airtight containers for up to four days. Add avocado after reheating." }, { question: "What can I use instead of quinoa?", answer: "Brown rice, farro, or cauliflower rice all work well." }]
};

export const recipes: Recipe[] = [
  { ...base, title: "Lemon Herb Chicken Quinoa Bowls", slug: "lemon-herb-chicken-quinoa-bowls", description: "Juicy lemon-garlic chicken, fluffy quinoa, and colorful roasted vegetables come together in an easy, protein-packed bowl.", category: categories[0], seoTitle: "Lemon Herb Chicken Quinoa Bowls (42g Protein)", metaDescription: "Make these easy lemon herb chicken quinoa bowls with roasted vegetables in 35 minutes. A healthy high-protein dinner perfect for meal prep." },
  { ...base, title: "Crispy Air Fryer Chicken Bites", slug: "crispy-air-fryer-chicken-bites", description: "Tender, golden chicken bites with a smoky seasoning blend—ready in just 20 minutes.", category: categories[2], prepMinutes: 8, cookMinutes: 12, calories: 310, protein: 39, seoTitle: "Healthy Air Fryer Chicken Bites", metaDescription: "Easy crispy air fryer chicken bites ready in 20 minutes." },
  { ...base, title: "15-Minute Mediterranean Chickpea Salad", slug: "mediterranean-chickpea-salad", description: "A bright pantry-friendly salad with crunchy vegetables, feta, and lemon vinaigrette.", category: categories[1], prepMinutes: 15, cookMinutes: 0, calories: 385, protein: 16, seoTitle: "15-Minute Mediterranean Chickpea Salad", metaDescription: "Fresh Mediterranean chickpea salad for a quick healthy lunch." },
  { ...base, title: "Berry Almond Overnight Oats", slug: "berry-almond-overnight-oats", description: "Creamy, naturally sweet overnight oats for effortless weekday mornings.", category: categories[4], prepMinutes: 10, cookMinutes: 0, calories: 365, protein: 18, seoTitle: "Healthy Berry Almond Overnight Oats", metaDescription: "Prep creamy berry almond overnight oats in 10 minutes." },
  { ...base, title: "One-Pan Turkey Taco Skillet", slug: "turkey-taco-skillet", description: "A veggie-loaded, budget-friendly skillet with lean turkey and bold taco flavor.", category: categories[5], prepMinutes: 10, cookMinutes: 20, calories: 410, protein: 37, seoTitle: "Healthy Turkey Taco Skillet", metaDescription: "Easy one-pan turkey taco skillet for a healthy budget dinner." },
  { ...base, title: "Green Goddess Meal Prep Boxes", slug: "green-goddess-meal-prep-boxes", description: "Crisp vegetables, grains, eggs, and a creamy herb dressing built for weekday lunches.", category: categories[3], calories: 430, protein: 24, seoTitle: "Green Goddess Meal Prep Boxes", metaDescription: "Fresh green goddess meal prep lunches that last all week." }
];

export const getRecipe = (slug: string) => recipes.find((recipe) => recipe.slug === slug);
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
