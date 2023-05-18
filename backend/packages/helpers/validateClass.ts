import { validateOrReject } from 'class-validator'

export default async function validateClass(data: object) {
  try {
    await validateOrReject(data)
  } catch (e: any) {
    const error = new Error(
      e
        .map((e2: any) => Object.values(e2.constraints))
        .flat()
        .join('. ')
    )
    throw error
  }
}
