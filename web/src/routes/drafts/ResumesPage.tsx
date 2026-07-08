import { useLoaderData, Link, Form, useNavigation } from "react-router"
import type { ResumeDraftResponse } from "../../api/resumeDrafts"

export function ResumesPage() {
  const drafts = useLoaderData() as ResumeDraftResponse[]
  const navigation = useNavigation()

  const isCreating =
    navigation.state === "submitting" && navigation.formAction === "/resumes"

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-center text-2xl font-bold">Select a resume</h1>

      <section className="mt-12">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 2xl:grid-cols-5">
          <li>
            <Form method="post" className="h-full">
              <button
                type="submit"
                disabled={isCreating}
                className="flex h-full min-h-40 w-full rounded border-2 border-dashed border-[#0066cc] p-6 text-left text-black hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-10"
              >
                <span className="text-xl font-semibold">
                  {isCreating ? "Creating..." : "Create new +"}
                </span>
              </button>
            </Form>
          </li>

          {drafts.map((draft) => (
            <li key={draft.id}>
              <Link
                to={`/resumes/${draft.id}/edit`}
                className="block h-full min-h-40 rounded border border-white bg-[#0066cc]/20 p-6 text-black hover:bg-gray-50"
              >
                <h2 className="text-xl font-semibold">{draft.title}</h2>

                <p className="mt-3 text-sm text-gray-500">
                  {draft.targetRole ? draft.targetRole : "No target role"} ·{" "}
                  {draft.template}
                </p>

                <p className="text-sm text-gray-500">
                  Created {new Date(draft.createdAt).toLocaleString()}
                </p>

                <p>debug: id is {draft.id}</p>
              </Link>
            </li>
          ))}
        </ul>

        {drafts.length === 0 && (
          <p className="mt-6 text-center text-sm text-gray-500">
            No resumes yet. Create your first one.
          </p>
        )}
      </section>
    </main>
  )
}
