import mongoose, { Mongoose } from 'mongoose'
import {CustomRequestHandler} from "@helpers/errorHandler";

let connection: Mongoose

export const connectDB = async () => {
  if (!connection) {
    console.info('Connecting to MongoDB')
    connection = await mongoose.connect(process.env.MONGO_URI ?? '')
  }
  return connection
}

export const transactional: (fn: CustomRequestHandler) => CustomRequestHandler = (fn: CustomRequestHandler) => async (req, res, next) => {
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
