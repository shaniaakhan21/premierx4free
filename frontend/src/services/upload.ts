import { putFetcher } from "../helpers/axiosFetchers";
import User from "../models/user.model";

export const uploadDocument = (user: User, document: File | File[]) => {
  const formData = new FormData()
  if (Array.isArray(document)) {
    document.forEach((file) => {
      formData.append('document', file)
    })
  } else {
    formData.append('document', document)
  }
  return putFetcher<any, string[]>(['/upload', formData, user, undefined, undefined])
}
