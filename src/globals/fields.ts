import type { Field } from "payload";

// Small builders for the content globals, so every editable text is localized
// (Greek + English) and every photo is a Media upload.

export const localizedText = (name: string, label?: string): Field => ({
  name,
  label,
  type: "text",
  localized: true,
});

export const localizedTextarea = (name: string, label?: string, description?: string): Field => ({
  name,
  label,
  type: "textarea",
  localized: true,
  admin: description ? { description } : undefined,
});

export const mediaUpload = (name: string, label?: string, description?: string): Field => ({
  name,
  label,
  type: "upload",
  relationTo: "media",
  admin: description ? { description } : undefined,
});

export const group = (name: string, label: string, fields: Field[]): Field => ({
  name,
  label,
  type: "group",
  fields,
});
