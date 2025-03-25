import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
    fastpagecolor:String,
    secondpagecolor:String,
    tages:[{tage:String,tagecolor:String}]
})

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
    tasks:[taskSchema],
    notes:[noteSchema],
})

const user = mongoose.model("user",userSchema)

export default user;