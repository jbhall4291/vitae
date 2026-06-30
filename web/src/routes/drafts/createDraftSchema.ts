import { z } from "zod"

export const createDraftSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Draft title is required")
    .max(100, "Draft title should be 100 characters or fewer."),

  targetRole: z.string().trim().optional(),

  template: z.enum(
    ["modern", "classic", "compact"],
    "Choose a valid template."
  ),
})

export type CreateDraft = z.infer<typeof createDraftSchema>
