import { CustomRequestHandler, InvalidRequestError } from '@helpers/errorHandler'
import { validateOrReject } from 'class-validator'
import mongoose, { Mongoose } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

let connection: Mongoose

export const connectDB = async () => {
  if (!connection) {
    console.info('Connecting to MongoDB')
    connection = await mongoose.connect(process.env.MONGO_URI ?? '')
  }
  return connection
}

export const transactional: (fn: CustomRequestHandler) => CustomRequestHandler =
  (fn: CustomRequestHandler) => async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      await fn(req, res, next)
      await session.commitTransaction()
    } catch (e) {
      await session.abortTransaction()
      next(e)
    } finally {
      await session.endSession()
    }
  }

export const generateFileName = (originalName: string) => `${uuidv4()}.${originalName.split('.').pop()}`

export default async function validateClass(data: object) {
  try {
    await validateOrReject(data)
  } catch (e: any) {
    console.log(e)
    const getConstraints: (e2: any, parentProperty?: string) => string[] = (e2, parentProperty) => {
      if (e2.constraints) {
        return (Object.values(e2.constraints) as string[]).map(
          (s) => `${parentProperty ? `${parentProperty}.` : ''}${s}`
        )
      }
      return Object.values(e2.children)
        .map((e3: any) => getConstraints(e3, e2.property))
        .flat()
    }
    const message = e.map(getConstraints).flat().join('. ')
    const error = new InvalidRequestError(message)
    error.publicMessage = message
    throw error
  }
}
