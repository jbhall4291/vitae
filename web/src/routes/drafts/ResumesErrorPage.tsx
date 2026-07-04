import { isRouteErrorResponse, useRouteError, Link } from "react-router"

export function ResumesErrorPage() {
  const error = useRouteError()

  let message = "Something went wrong."

  if (isRouteErrorResponse(error)) {
    message = error.data || error.statusText
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">Resume error</h1>

      <p className="mt-4 text-sm text-gray-600">{message}</p>

      <Link
        to="/resumes"
        className="mt-6 inline-block rounded border px-4 py-2 text-sm"
      >
        Back to resumes
      </Link>
    </main>
  )
}
