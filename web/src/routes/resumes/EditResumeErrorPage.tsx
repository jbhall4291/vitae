import { isRouteErrorResponse, useRouteError, Link } from "react-router"

export function EditResumeErrorPage() {
  const error = useRouteError()

  let message = "Something went wrong loading this resume."

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "That resume could not be found."
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Resume unavailable</h1>
      <p className="mt-2 text-gray-600">{message}</p>

      <Link to="/drafts" className="mt-4 inline-block underline">
        Back to drafts
      </Link>
    </main>
  )
}
