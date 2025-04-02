import express from "express";
import authMiddleware from "../middleware/Authmiddleware.js";
import userModel from "../model/user.model.js";
import postModel from "../model/post.modle.js";
import mongoose from "mongoose";

const router = express.Router()

router.post("/followuser/:followid",authMiddleware, async (req,res)=>{
    const {followid} = req.params;
    const User = req.user.id;
     
    const user = await userModel.findById(User);
    const userToFollow = await userModel.findById(followid);

    if(!user || !userToFollow){
        return res.status(404).json({message:"user not found"})
    } 

    if(!user.following.includes(followid)){
     user.following.push(followid);
     await user.save();
    }

})

router.post("/unfollowuser/:followid",authMiddleware, async (req,res)=>{
       const {followid} = req.params;
       const User = req.user.id;
        
        const user = await userModel.findById(User)

       if(!user){
        return res.status(404).json({message:"user not found"})
       }

       if (!user.following) {
        user.following = []; 
      }

       user.following = user.following.filter((followedid) => followedid.toString() !== followid )
       await user.save();
       
})


router.get("/get-followed-user",authMiddleware, async (req,res)=>{
    const User = req.user.id;
    
    const user = await userModel.findById(User).populate("following");

    if(!user){
        res.status(404).json({message:'user not found'})
    }
    
    res.json(user.following);

})

router.get('/followed-posts',authMiddleware, async (req,res)=>{
    try{
        const User = req.user.id;

        const user = await userModel.findById(User)
        if(!user) return res.status(404).json({message:"user not found"})
       
        const followedpost = await postModel.find({userid:{$in:user.following}})
        .populate("userid", "username profilepic")
        .populate("coments.userid", "username profilepic")
        .sort({createdAt:-1 });

            res.json(followedpost);

    }catch(error){
        console.error("error fetching user posts:",error);
        res.status(500).json({message:"server error"})
        
    }
})


export default router;