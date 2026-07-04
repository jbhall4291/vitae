import { createResumeDraft } from "@/api/resumeDrafts"
import type { ActionFunctionArgs } from "react-router"
import { redirect } from "react-router"

export async function resumesAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 })
  }

  const created = await createResumeDraft({
    title: "Untitled resume",
    targetRole: "",
    template: "modern",
  })

  return redirect(`/resumes/${created.id}/edit`)
}
