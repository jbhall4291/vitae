import type { ResumeDraftResponse } from "@/api/resumeDrafts"
import { useOutletContext } from "react-router"

type ResumeOutletContext = {
  draft: ResumeDraftResponse
}

export function DesignResumePage() {
  const { draft } = useOutletContext<ResumeOutletContext>()

  return (
    <section className="rounded-lg border p-4">
      <h2 className="text-lg font-medium">Design</h2>
      <p className="mt-2 text-sm text-gray-500">
        Template, colour and spacing controls will go here.
      </p>

      <div>{draft.title}</div>
    </section>
  )
}
