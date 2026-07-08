import { Link, NavLink, Outlet, useLoaderData, Form } from "react-router"
import type { ResumeDraftResponse } from "@/api/resumeDrafts"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

type ResumeLoaderData = {
  draft: ResumeDraftResponse
  drafts: ResumeDraftResponse[]
}

export type ResumeOutletContext = {
  draft: ResumeDraftResponse
}

export function ResumeAppLayout() {
  const { draft, drafts } = useLoaderData() as ResumeLoaderData

  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">Resumes</Button>
              </SheetTrigger>

              <SheetContent side="left" className="flex flex-col px-4">
                <SheetHeader>
                  <SheetTitle>Your resumes</SheetTitle>
                </SheetHeader>
                <ScrollArea className="min-h-0 flex-1">
                  <ul className="mt-6 space-y-2">
                    {drafts.map((item) => {
                      const isSelected = item.id === draft.id

                      return (
                        <li key={item.id}>
                          <Link
                            to={`/resumes/${item.id}/edit`}
                            onClick={() => setSheetOpen(false)}
                            className={`block rounded-md border p-3 text-sm hover:bg-gray-50 ${
                              isSelected ? "bg-gray-100" : ""
                            }`}
                          >
                            <div className="font-medium">{item.title}</div>

                            {/* <div className="mt-1 text-xs text-gray-500">
                              {item.targetRole ?? "No target role"} ·{" "}
                              {item.template}
                            </div> */}

                            <p>debug: id is {item.id}</p>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </ScrollArea>
                <div className="border-t py-4">
                  <Form
                    method="post"
                    action="/resumes"
                    onSubmit={() => setSheetOpen(false)}
                  >
                    <Button type="submit" className="h-12 w-full">
                      Create new resume
                    </Button>
                  </Form>
                </div>
              </SheetContent>
            </Sheet>

            {/* <div>
              <h1 className="text-xl font-semibold">{draft.title}</h1>
              <h2>debud id: {draft.id}</h2>
              <p className="text-sm text-gray-500">
                {draft.targetRole ?? "No target role"} · {draft.template}
              </p>
            </div> */}
          </div>

          <nav className="flex gap-4 text-sm">
            <NavLink to="/" className="bg-black p-1 text-white">
              Home
            </NavLink>
            <NavLink to="edit">Edit</NavLink>
            <NavLink to="design">Design</NavLink>
            <NavLink to="share">Share</NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        <Outlet context={{ draft }} />
      </main>
    </div>
  )
}
