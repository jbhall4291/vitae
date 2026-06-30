import { createBrowserRouter, Navigate } from "react-router"
import { DraftsPage } from "@/routes/drafts/DraftsPage"
import { draftsLoader } from "@/routes/drafts/draftsLoader"
import DraftsErrorPage from "./routes/drafts/DraftsErrorPage"
import { draftsAction } from "./routes/drafts/draftsAction"

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
])
