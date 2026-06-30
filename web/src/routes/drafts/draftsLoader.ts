import { getResumeDrafts } from "@/api/resumeDrafts"

export async function draftsLoader() {
  return await getResumeDrafts()
}
