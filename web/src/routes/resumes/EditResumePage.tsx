import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { editResumeSchema, type EditResumeFormValues } from "./editResumeSchema"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

import type { ResumeDraftResponse } from "@/api/resumeDrafts"
import type { EditResumeActionData } from "./editResumeAction"

type ResumeOutletContext = {
  draft: ResumeDraftResponse
}
export function EditResumePage() {
  const { draft } = useOutletContext<ResumeOutletContext>()
  const actionData = useActionData() as EditResumeActionData | undefined
  const navigation = useNavigation()

  const isSaving = navigation.state === "submitting"

  const {
    register,
    control,
    trigger,
    reset,
    setError,
    formState: { errors },
  } = useForm<EditResumeFormValues>({
    resolver: zodResolver(editResumeSchema),
    defaultValues: {
      title: draft.title,
      targetRole: draft.targetRole ?? "",
      template: draft.template,
    },
  })

  useEffect(() => {
    reset({
      title: draft.title,
      targetRole: draft.targetRole ?? "",
      template: draft.template,
    })
  }, [draft.id, draft.title, draft.targetRole, draft.template, reset])

  useEffect(() => {
    if (!actionData?.fieldErrors) return

    for (const [field, messages] of Object.entries(actionData.fieldErrors)) {
      if (!messages?.length) continue

      setError(field as keyof EditResumeFormValues, {
        type: "server",
        message: messages[0],
      })
    }
  }, [actionData, setError])
  return (
    <section className="rounded-lg border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium">Edit resume</h2>
        <p className="mt-2 text-sm text-gray-500">Editing: {draft.title}</p>
      </div>

      <Form
        method="post"
        className="space-y-5"
        onSubmit={async (event) => {
          const isValid = await trigger()

          if (!isValid) {
            event.preventDefault()
          }
        }}
      >
        {actionData?.formError ? (
          <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionData.formError}
          </div>
        ) : null}

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Resume title
          </label>

          <Input
            id="title"
            {...register("title")}
            aria-invalid={Boolean(errors.title)}
          />

          {errors.title?.message ? (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="targetRole" className="text-sm font-medium">
            Target role
          </label>

          <Input
            id="targetRole"
            {...register("targetRole")}
            aria-invalid={Boolean(errors.targetRole)}
          />

          {errors.targetRole?.message ? (
            <p className="text-sm text-red-600">{errors.targetRole.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="template" className="text-sm font-medium">
            Template
          </label>

          <Controller
            name="template"
            control={control}
            render={({ field }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="template"
                    aria-invalid={Boolean(errors.template)}
                  >
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>

                <input type="hidden" name={field.name} value={field.value} />
              </>
            )}
          />

          {errors.template?.message ? (
            <p className="text-sm text-red-600">{errors.template.message}</p>
          ) : null}
        </div>

        <div className="flex justify-end border-t pt-5">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </Form>
    </section>
  )
}
