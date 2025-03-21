import express from "express"

import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import genretToken from "../utils/genretToken.js";
import userModel from "../model/user.model.js";
import authMiddleware from "../middleware/Authmiddleware.js";

const router = express.Router();


router.post('/register', async (req,res)=>{
    console.log(req.body)
    
    const {username,email,password} = req.body
    
    const userfound = await userModel.findOne({
        $or:[{email},{username}]
    })
    
    if(userfound){

        if(userfound.username === username){
            return res.status(400).json({message:"username is already exists"})
            
        }
        
        if(userfound.email === email){
            return res.status(400).json({message:"email is already exists"})
            
        }
    }
    
    
    const hashpassword = await bcrypt.hash(password,10)
    
    
     await userModel.create({
            username,
            email,
            password:hashpassword,

        })
        res.status(201).json({message:"user register successfully"})

})

router.post("/login", async (req,res)=>{

    const {email,password} = req.body
     console.log(req.body)
     
    const user = await userModel.findOne({email})
    
    if(!user){
        res.status(400).json({message:"email or password is wrong"})
        return
    }

    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch){
        res.status(400).json({message:"email or password is wrong"})
        return
    }
     
    const token = await genretToken(user)
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        path:'/',
    })
     
    res.status(200).json({message:"hey it working"})


})

router.get('/check-auth',authMiddleware,(req,res)=>{
    res.status(200).json({message:"Authenticated",user:req.user})
})

router.post("/logout",(req,res)=>{
    res.cookie("token",'',{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        expires:new Date(0),
        path:"/"
    })
    res.status(200).json({ message: "Logged out successfully" });
})

export default router;