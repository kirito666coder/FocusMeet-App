import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const mongoDb = async ()=>{
   await mongoose.connect(`${process.env.MONGODB_URL}/your-task-manager`)
   console.log("DB is connected")
} 

export default mongoDb;