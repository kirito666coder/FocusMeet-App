import express from "express";
import authMiddleware from "../middleware/Authmiddleware.js";
import usermodle from "../model/user.model.js";

const router = express.Router();

router.post("/savingnote",authMiddleware, async (req,res)=>{
    
    try{
    
     const {title,description,allcolors} = req.body

     const userid = req.user.id;
     const user = await usermodle.findById(userid)
     
     const {fastpagecolore,secondepagecolore,tages} = allcolors
    
     if(!user){
        return res.status(401).json({message:"user not found "})
     }



     user.notes.push({
        title,
        description,
        fastpagecolor:fastpagecolore,
        secondpagecolor:secondepagecolore,
        tages,
    })
    await user.save()

     
    res.status(201).json({message:"all work good "})


 }catch(error){
    res.status(500).json({error:"Server error"})

 }

  


})

router.get("/noteslist",authMiddleware,(req,res)=>{

      try{

          const userid = req.user.id;
          
          const user = usermodle.findById(userid)
          
          if(!user){
              res.status(401).json({message:"usernot find somthing wrong"})
            }
            
            res.json(user.tages)
        }catch(error){
            res.status(500).json({error:"Server error"})
        } 

})


export default router;