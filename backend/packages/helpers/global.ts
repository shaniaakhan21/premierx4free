import { CustomRequestHandler, InvalidRequestError } from '@helpers/errorHandler'
import { validateOrReject } from 'class-validator'
import mongoose, { Mongoose } from 'mongoose'

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

export default async function validateClass(data: object) {
  try {
    await validateOrReject(data)
  } catch (e: any) {
    const message = e
      .map((e2: any) => Object.values(e2.constraints))
      .flat()
      .join('. ')
    const error = new InvalidRequestError(message)
    error.publicMessage = message
    throw error
  }
}
