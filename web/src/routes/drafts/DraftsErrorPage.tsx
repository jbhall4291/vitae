import { Button } from "@/components/ui/button"
import { isRouteErrorResponse, useRouteError } from "react-router"

export default function DraftsErrorPage() {
  const error = useRouteError()

  let message = "Something went wrong loading drafts."

  if (isRouteErrorResponse(error)) {
    message = error.statusText
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md flex-col gap-4 text-sm">
        <div>
          <h1 className="font-medium">Could not load drafts</h1>
          <p className="text-red-600">{message}</p>
        </div>

        <Button
          onClick={() => {
            window.location.reload()
          }}
        >
          Retry
        </Button>
      </div>
    </div>
  )
}
