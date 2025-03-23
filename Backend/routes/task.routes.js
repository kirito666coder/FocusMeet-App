import express from "express";
import authMiddleware from "../middleware/Authmiddleware.js";
import usermodle from "../model/user.model.js";

import mongoose from "mongoose";


const router = express.Router();

router.get('/next10days',(req,res)=>{
  
    const daysOfWeek =  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const next10days = [];
  

    for (let i = 0 ;i<10;i++){
        const date = new Date();
        date.setDate(date.getDate()+i);

        next10days.push({
            dayNumber:date.getDate(),
            dayName:daysOfWeek[date.getDay()],
            month:months[date.getMonth()],
            year:date.getFullYear(),
          

        })
    }
    
   res.json(next10days);
})

router.post("/taskSave",authMiddleware, async (req,res)=>{
    try{

        const userId = req.user.id;
        const {title,description,bgcolor} = req.body;
        
       
        const color = bgcolor === ""?"bg-red-300":bgcolor
        
        const user = await usermodle.findById(userId)
        if(!user) return res.status(401).json({error:"User not found"})
            user.tasks.push({title,description,color});
            await user.save();
            
            res.status(201).json({message:"task added successfully ",tasks:user.tasks})
        }catch(error){
            res.status(500).json({Error:"Server error"})
        }
    

})

router.get("/taskList",authMiddleware, async (req,res)=>{
   try{
    const userId = await req.user.id;
    const user = await usermodle.findById(userId);

    if(!user) return res.status(404).json({error:"user not found"})
    
     res.json(user.tasks)
  
   }catch(error){
    res.status(500).json({error:"Server error"})
   }


})

router.delete("/taskdelete/:taskid",authMiddleware, async (req,res)=>{

    try{
        const userId = req.user.id;
        const {taskid} = req.params;

    
        
        const result = await usermodle.updateOne(
            { _id: userId},
            {$pull:{tasks:{ _id: new mongoose.Types.ObjectId(taskid)}}}

        )
        if(result.modifiedCount === 0){
            return res.status(404).json({error:"task not found "})
        }

        const updateUser = await usermodle.findById(userId)
        
        res.json({message:"Task deleted successfully",tasks:updateUser.tasks})
    }catch (error) {
   
        res.status(500).json({ error: "Server error" });
    }
})

export default router;