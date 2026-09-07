import { describe, expect, it } from "vitest";
import { recipes } from "./content";
import { absoluteUrl, buildFaqSchema, buildRecipeSchema, isoDuration } from "./schema";

describe("SEO schema utilities", () => {
  it("creates valid ISO durations including hours", () => {
    expect(isoDuration(0)).toBe("PT0M");
    expect(isoDuration(35)).toBe("PT35M");
    expect(isoDuration(90)).toBe("PT1H30M");
    expect(isoDuration(120)).toBe("PT2H");
  });
  it("builds canonical absolute URLs", () => {
    expect(absoluteUrl("/recipes/test", "https://example.com/")).toBe("https://example.com/recipes/test");
  });
  it("contains Recipe fields and no fabricated ratings", () => {
    const schema = buildRecipeSchema(recipes[0], "https://example.com");
    expect(schema["@type"]).toBe("Recipe");
    expect(schema.mainEntityOfPage).toBe("https://example.com/recipes/lemon-herb-chicken-quinoa-bowls");
    expect(schema.nutrition.proteinContent).toBe("42 g");
    expect(schema.recipeInstructions[0].position).toBe(1);
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema).not.toHaveProperty("review");
  });
  it("only creates FAQ markup when genuine FAQs exist", () => {
    expect(buildFaqSchema([])).toBeNull();
    expect(buildFaqSchema(recipes[0].faqs)?.mainEntity).toHaveLength(2);
  });
});
