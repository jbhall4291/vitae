import { z } from "zod"

export const editResumeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Resume title is required")
    .max(100, "Resume title should be 100 characters or fewer."),

  targetRole: z.string().trim().optional(),

  template: z.enum(
    ["modern", "classic", "compact"],
    "Choose a valid template."
  ),
})

export type EditResumeFormValues = z.infer<typeof editResumeSchema>
