import { getResumeDrafts } from "@/api/resumeDrafts"

export async function resumesLoader() {
  return await getResumeDrafts()
}
