import mongoose from "mongoose"
import { DB_NAME } from "../constants"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Database connected !! Host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error in connecting to database", error.message)
    }
}

export {connectDB}