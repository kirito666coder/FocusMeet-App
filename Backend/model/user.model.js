import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
    color:String,
    createdAt:{type:Date,default:Date.now}
})


const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    tasks:[taskSchema]
})

const user = mongoose.model("user",userSchema)

export default user;