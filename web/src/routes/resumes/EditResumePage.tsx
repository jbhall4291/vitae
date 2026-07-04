import { useOutletContext } from "react-router"
import type { ResumeDraftResponse } from "@/api/resumeDrafts"

type ResumeOutletContext = {
  draft: ResumeDraftResponse
}
export function EditResumePage() {
  const { draft } = useOutletContext<ResumeOutletContext>()

  return (
    <section className="rounded-lg border p-4">
      <h2 className="text-lg font-medium">Edit resume</h2>

      <p className="mt-2 text-sm text-gray-500">Editing: {draft.title}</p>
    </section>
  )
}
