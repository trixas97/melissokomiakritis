// The admin's text when filled in, otherwise the built-in fallback.
export const pick = (value: string | null | undefined, fallback: string) =>
  value?.trim() ? value : fallback;

// Splits admin text into paragraphs at blank lines.
export const toParagraphs = (value: string | null | undefined) =>
  (value ?? "").split(/\n\s*\n/).filter((paragraph) => paragraph.trim());
