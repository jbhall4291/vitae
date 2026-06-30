import { createResumeDraft } from "@/api/resumeDrafts"
import type { ActionFunctionArgs } from "react-router"
import { createDraftSchema } from "./createDraftSchema"

export type DraftsActionData = {
  fieldErrors?: {
    title?: string[]
    targetRole?: string[]
    template?: string[]
  }
  formError?: string
}

export async function draftsAction({
  request,
}: ActionFunctionArgs): Promise<DraftsActionData | null> {
  const formData = await request.formData()

  const rawValues = {
    title: formData.get("title"),
    targetRole: formData.get("targetRole"),
    template: formData.get("template"),
  }

  const result = createDraftSchema.safeParse(rawValues)

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    }
  }

  await createResumeDraft({
    title: result.data.title,
    targetRole: result.data.targetRole,
    template: result.data.template,
  })

  return null
}
