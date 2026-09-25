import { LABEL_KEYS } from "@/globals/Labels";

type Messages = Record<string, Record<string, unknown>>;

// Returns the message files with every non-empty Labels value from Payload laid
// over the matching key. Keys not listed in LABEL_KEYS are left untouched.
// `labelsDoc` is the Labels global (its groups mirror the message namespaces).
export function mergeLabels(messages: Messages, labelsDoc: object | null): Messages {
  if (!labelsDoc) return messages;
  const labels = labelsDoc as Record<string, unknown>;

  return Object.fromEntries(
    Object.entries(messages).map(([namespace, values]) => {
      const keys: readonly string[] = LABEL_KEYS[namespace as keyof typeof LABEL_KEYS] ?? [];
      const overrides = (labels[namespace] ?? {}) as Record<string, unknown>;
      const merged = { ...values };
      for (const key of keys) {
        const value = overrides[key];
        if (typeof value === "string" && value.trim()) merged[key] = value;
      }
      return [namespace, merged];
    }),
  );
}
