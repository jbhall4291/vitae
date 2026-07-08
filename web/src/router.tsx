import { createBrowserRouter, Navigate } from "react-router"
import { ResumesPage } from "@/routes/drafts/ResumesPage"
import { resumeLoader } from "./routes/resumes/resumeLoader"
import { EditResumePage } from "./routes/resumes/EditResumePage"
import { ResumeAppLayout } from "./routes/resumes/ResumeAppLayout"
import { DesignResumePage } from "./routes/resumes/DesignResumePage"
import { ShareResumePage } from "./routes/resumes/ShareResumePage"
import { resumesLoader } from "./routes/drafts/resumesLoader"
import { resumesAction } from "./routes/drafts/resumesAction"
import { ResumesErrorPage } from "./routes/drafts/ResumesErrorPage"
import { editResumeAction } from "./routes/resumes/editResumeAction"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/resumes" replace />,
  },
  {
    path: "/resumes",
    element: <ResumesPage />,
    loader: resumesLoader,
    action: resumesAction,
    errorElement: <ResumesErrorPage />,
  },
  {
    path: "/resumes/:resumeId",
    element: <ResumeAppLayout />,
    loader: resumeLoader,
    errorElement: <ResumesErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="edit" replace />,
      },
      {
        path: "edit",
        element: <EditResumePage />,
        action: editResumeAction,
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
