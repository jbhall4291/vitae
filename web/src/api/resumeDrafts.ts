export type ResumeTemplate = "modern" | "classic" | "compact"

export type ResumeDraftResponse = {
  id: number
  title: string
  targetRole: string | null
  template: ResumeTemplate
  createdAt: string
  updatedAt: string
}

export type CreateResumeDraftRequest = {
  title: string
  targetRole?: string
  template: ResumeTemplate
}

export type UpdateResumeDraftRequest = {
  title: string
  targetRole: string
  template: ResumeTemplate
}

const API_BASE_URL = "http://localhost:5104"

export async function getResumeDrafts(): Promise<ResumeDraftResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/resume-drafts`)

  if (!response.ok) {
    throw new Error(`failed to fetch resume drafts: ${response.status}`)
  }

  return (await response.json()) as ResumeDraftResponse[]
}

export async function getResumeDraftById(
  id: number
): Promise<ResumeDraftResponse> {
  const response = await fetch(`${API_BASE_URL}/api/resume-drafts/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch resume draft")
  }

  return (await response.json()) as ResumeDraftResponse
}

export async function createResumeDraft(
  draft: CreateResumeDraftRequest
): Promise<ResumeDraftResponse> {
  const response = await fetch(`${API_BASE_URL}/api/resume-drafts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(draft),
  })

  if (!response.ok) {
    throw new Error(`failed to create resume draft: ${response.status}`)
  }

  return (await response.json()) as ResumeDraftResponse
}

export async function updateResumeDraft(
  id: number,
  draft: UpdateResumeDraftRequest
): Promise<ResumeDraftResponse> {
  const response = await fetch(`${API_BASE_URL}/api/resume-drafts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(draft),
  })

  if (!response.ok) {
    throw new Error(`failed to update resume draft: ${response.status}`)
  }

  return (await response.json()) as ResumeDraftResponse
}

export async function deleteResumeDraft(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/resume-drafts/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`failed to delete resume draft: ${response.status}`)
  }
}
