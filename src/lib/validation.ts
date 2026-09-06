export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function isValidSlug(value: string) { return SLUG_PATTERN.test(value); }
export type ValidationResult = { valid: boolean; errors: Record<string, string> };
export function validateRecipeInput(input: Record<string, FormDataEntryValue | null>): ValidationResult {
  const errors: Record<string, string> = {}; const title = String(input.title ?? "").trim(); const slug = String(input.slug ?? "").trim(); const description = String(input.description ?? "").trim();
  if (title.length < 3) errors.title = "Title must be at least 3 characters.";
  if (!isValidSlug(slug)) errors.slug = "Use lowercase letters, numbers, and single hyphens.";
  if (description.length < 20) errors.description = "Description must be at least 20 characters.";
  if (!String(input.ingredients ?? "").trim()) errors.ingredients = "Add at least one ingredient.";
  if (!String(input.instructions ?? "").trim()) errors.instructions = "Add at least one instruction.";
  return { valid: Object.keys(errors).length === 0, errors };
}
export function isPublishedVisible(status: string, publishedAt: string | null) { return status === "published" && Boolean(publishedAt) && new Date(publishedAt!).getTime() <= Date.now(); }
