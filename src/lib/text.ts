// The admin's text when filled in, otherwise the built-in fallback.
export const pick = (value: string | null | undefined, fallback: string) =>
  value?.trim() ? value : fallback;
