import { createBrowserRouter, Navigate } from "react-router"
import { DraftsPage } from "@/routes/drafts/DraftsPage"
import { draftsLoader } from "@/routes/drafts/draftsLoader"
import DraftsErrorPage from "./routes/drafts/DraftsErrorPage"
import { draftsAction } from "./routes/drafts/draftsAction"
import { resumeLoader } from "./routes/resumes/editResumeLoader"
import { EditResumePage } from "./routes/resumes/EditResumePage"
import { EditResumeErrorPage } from "./routes/resumes/EditResumeErrorPage"
import { ResumeAppLayout } from "./routes/resumes/ResumeAppLayout"
import { DesignResumePage } from "./routes/resumes/DesignResumePage"
import { ShareResumePage } from "./routes/resumes/ShareResumePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/drafts" replace />,
  },
  {
    path: "/drafts",
    element: <DraftsPage />,
    loader: draftsLoader,
    action: draftsAction,
    errorElement: <DraftsErrorPage />,
  },
  {
    path: "/resumes/:resumeId",
    element: <ResumeAppLayout />,
    loader: resumeLoader,
    errorElement: <EditResumeErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="edit" replace />,
      },
      {
        path: "edit",
        element: <EditResumePage />,
      },
      {
        path: "design",
        element: <DesignResumePage />,
      },
      {
        path: "share",
        element: <ShareResumePage />,
      },
    ],
  },
])
