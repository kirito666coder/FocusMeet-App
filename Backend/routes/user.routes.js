import express from "express"

import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import genretToken from "../utils/genretToken.js";
import userModel from "../model/user.model.js";

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
     
    const Token = await genretToken(user)
    res.cookie("token",Token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
    })
     
    res.status(200).json({message:"hey it working"})


})



export default router;