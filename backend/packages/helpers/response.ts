export type GenericResponse = {
  success: boolean
  message: string
}

export type ErrorResponse = GenericResponse & {
  error: string
  stack: string
}

export type SuccessResponse<T> = GenericResponse & {
  data?: T
}

export const successResponse = <T>(data?: T, message = 'Success'): SuccessResponse<T> => ({
  success: true,
  message,
  data
})
