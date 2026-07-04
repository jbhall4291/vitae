import type { LoaderFunctionArgs } from "react-router"
import { getResumeDraftById, getResumeDrafts } from "@/api/resumeDrafts"

export async function resumeLoader({ params }: LoaderFunctionArgs) {
  const resumeId = Number(params.resumeId)

  if (Number.isNaN(resumeId)) {
    throw new Response("Invalid resume id", { status: 400 })
  }

  const [draft, drafts] = await Promise.all([
    getResumeDraftById(resumeId),
    getResumeDrafts(),
  ])

  return {
    draft,
    drafts,
  }
}