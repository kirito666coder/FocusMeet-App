import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/Authmiddleware.js";
import usermodel from "../model/user.model.js";
import fs from "fs";
import path from "path";
const router = express.Router()

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "uploads/");
    },
    filename:(req,file,cb)=>{
        
        const filePath = path.join("uploads/", file.originalname);

        if(fs.existsSync(filePath)){
            cb(null ,file.originalname)
        }else{

            cb(null, Date.now() + "-" + file.originalname)
        }
    }
})

const uploads = multer({storage:storage});

router.put("/edit",authMiddleware,uploads.fields([
    {name: "profilepic",maxCount:1},
    {name:"profilepicback",maxCount:1}
]), async (req,res)=>{

    try{
        const userId = req.user.id;
        const {newusername}= req.body;

        let user = await usermodel.findById(userId)
        if(!user){
            return res.status(400).json("User not found")
        }

        if(newusername && newusername !== user.username){
            const existingUser = await usermodel.findOne({username:newusername})
            if(existingUser){
                return res.status(400).json({message:"Username is already taken"})
            }
            user.username = newusername;
        }

        if(req.files.profilepic){
            user.profilepic = req.files.profilepic[0].path.replace(/\\/g,"/");
        }
        
        if(req.files.profilepicback){
            user.profilepicback = req.files.profilepicback[0].path.replace(/\\/g,"/");
        }

        await user.save();
        res.json({message:"profile updated successfully",user})


    }catch(error){

    }
})

router.get("/userdata",authMiddleware, async (req,res)=>{
     try{

        const userid = req.user.id;
        
        const user = await usermodel.findById(userid)
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json({user})

     }catch(error){
        res.status(500).json({ message: "Server error" });

     }
})

export default router;

