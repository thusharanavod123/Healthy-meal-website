export type Category = { name: string; slug: string; description: string };
export type Recipe = {
  id?: string;
  title: string; slug: string; description: string; image: string; imageAlt: string; author: string;
  publishedAt: string; updatedAt: string; prepMinutes: number; cookMinutes: number; servings: number;
  calories: number; protein: number; carbs: number; fat: number; category: Category; tags: string[];
  ingredients: string[]; instructions: string[]; tips: string[]; faqs: { question: string; answer: string }[];
  seoTitle: string; metaDescription: string; status: "draft" | "published"; featured?: boolean;
};
