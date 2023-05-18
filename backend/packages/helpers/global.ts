import mongoose, { Mongoose } from 'mongoose'

let connection: Mongoose

export const connectDB = async () => {
  if (!connection) {
    console.info('Connecting to MongoDB')
    connection = await mongoose.connect(process.env.MONGO_URI ?? '')
  }
  return connection
}
