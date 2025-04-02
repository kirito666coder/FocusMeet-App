import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
   userid:{type:mongoose.Schema.Types.ObjectId, ref :"user"},
   heading:String,
   postimage:String,
   likes:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}],
   coments:[
      {
         userid:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
         username:{type:String},
         profilepic:{type:String},
         coment:{type:String},
         timestamp:{type:Date,default:Date.now}
      }
   ]
},{timestamps:true})


const post = mongoose.model("post",postSchema)

export default post;