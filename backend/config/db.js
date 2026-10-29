import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      process.env.DATABASE_URL ||
      process.env.MONGO_URL ||
      process.env.DB_URI

    if (!uri) {
      console.error('❌ MongoDB error: MONGO_URI (or MONGODB_URI) is not defined in your Render Environment variables.')
      process.exit(1)
    }

    const conn = await mongoose.connect(uri)

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB