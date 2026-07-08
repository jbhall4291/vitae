import { updateResumeDraft } from "@/api/resumeDrafts"
import type { ActionFunctionArgs } from "react-router"
import { editResumeSchema } from "./editResumeSchema"

export type EditResumeActionData = {
  fieldErrors?: {
    title?: string[]
    targetRole?: string[]
    template?: string[]
  }
  formError?: string
}

export async function editResumeAction({
  request,
  params,
}: ActionFunctionArgs): Promise<EditResumeActionData | null> {
  const formData = await request.formData()

  const rawValues = {
    title: formData.get("title"),
    targetRole: formData.get("targetRole"),
    template: formData.get("template"),
  }

  const result = editResumeSchema.safeParse(rawValues)

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    }
  }

  const resumeIdParam = params.resumeId
  const resumeId = Number(resumeIdParam)

  if (!resumeIdParam || !Number.isInteger(resumeId)) {
    return {
      formError: "Invalid resume ID.",
    }
  }

  try {
    await updateResumeDraft(resumeId, {
      title: result.data.title,
      targetRole: result.data.targetRole ?? "",
      template: result.data.template,
    })

    return null
  } catch {
    return {
      formError: "Could not save resume changes.",
    }
  }
}
