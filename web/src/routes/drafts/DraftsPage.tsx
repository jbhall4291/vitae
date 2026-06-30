import { useForm } from "react-hook-form"
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router"
import type { ResumeDraftResponse } from "../../api/resumeDrafts"
import { type CreateDraft, createDraftSchema } from "./createDraftSchema"
import { zodResolver } from "@hookform/resolvers/zod"

type DraftsActionData = {
  fieldErrors?: {
    title?: string[]
    targetRole?: string[]
    template?: string[]
  }
  formError?: string
}

export function DraftsPage() {
  const drafts = useLoaderData() as ResumeDraftResponse[]
  const actionData = useActionData() as DraftsActionData | undefined
  const navigation = useNavigation()
  const submit = useSubmit()

  const isSubmitting = navigation.state === "submitting"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDraft>({
    resolver: zodResolver(createDraftSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      targetRole: "",
      template: "modern",
    },
  })

  const titleError =
    errors.title?.message ?? actionData?.fieldErrors?.title?.[0]

  const targetRoleError =
    errors.targetRole?.message ?? actionData?.fieldErrors?.targetRole?.[0]

  const templateError =
    errors.template?.message ?? actionData?.fieldErrors?.template?.[0]

  function onSubmit(values: CreateDraft) {
    const formData = new FormData()

    formData.set("title", values.title)
    formData.set("targetRole", values.targetRole ?? "")
    formData.set("template", values.template)

    submit(formData, {
      method: "post",
    })
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">Resume drafts</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Draft title
          </label>

          <input
            id="title"
            type="text"
            {...register("title")}
            className="mt-1 w-full rounded-md border px-3 py-2"
            aria-invalid={titleError ? "true" : "false"}
            aria-describedby={titleError ? "title-error" : undefined}
          />

          {titleError ? (
            <p id="title-error" className="mt-1 text-sm text-red-600">
              {titleError}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="targetRole" className="block text-sm font-medium">
            Target role
          </label>

          <input
            id="targetRole"
            type="text"
            {...register("targetRole")}
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="e.g. React Developer"
            aria-invalid={targetRoleError ? "true" : "false"}
            aria-describedby={targetRoleError ? "target-role-error" : undefined}
          />

          {targetRoleError ? (
            <p id="target-role-error" className="mt-1 text-sm text-red-600">
              {targetRoleError}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="template" className="block text-sm font-medium">
            Starting template
          </label>

          <select
            id="template"
            {...register("template")}
            className="mt-1 w-full rounded-md border px-3 py-2"
            aria-invalid={templateError ? "true" : "false"}
            aria-describedby={templateError ? "template-error" : undefined}
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="compact">Compact</option>
          </select>

          {templateError ? (
            <p id="template-error" className="mt-1 text-sm text-red-600">
              {templateError}
            </p>
          ) : null}
        </div>

        {actionData?.formError ? (
          <p className="text-sm text-red-600">{actionData.formError}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create draft"}
        </button>
      </form>

      <section className="mt-8">
        {drafts.length === 0 ? (
          <p>No drafts yet.</p>
        ) : (
          <ul className="space-y-3">
            {drafts.map((draft) => (
              <li key={draft.id} className="rounded-md border p-4">
                <h2 className="font-medium">{draft.title}</h2>

                <p className="text-sm text-gray-500">
                  {draft.targetRole ? draft.targetRole : "No target role"} ·{" "}
                  {draft.template}
                </p>

                <p className="text-sm text-gray-500">
                  Created {new Date(draft.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
