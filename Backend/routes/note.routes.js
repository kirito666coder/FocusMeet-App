import express from "express";
import mongoose from "mongoose";
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
     let fast = fastpagecolore ;
     if(fastpagecolore === ""){
        fast = "bg-red-400"
     }
     let second = secondepagecolore;
     if(secondepagecolore === ""){
      second = "bg-blue-400"
     }



     user.notes.push({
        title,
        description,
        fastpagecolor:fast,
        secondpagecolor:second,
        tages,
    })
    await user.save()

     
    res.status(201).json({message:"all work good "})


 }catch(error){
    res.status(500).json({error:"Server error"})

 }

  


})

router.get("/noteslist",authMiddleware, async (req,res)=>{

      try{

          const userid = req.user.id;
        
          const user = await usermodle.findById(userid)
          
          if(!user){
              res.status(401).json({message:"usernot find somthing wrong"})
            }
            
            res.json(user.notes)
           
   
        }catch(error){
            res.status(500).json({error:"Server error"})
        } 

})

router.delete("/notedelete/:noteID",authMiddleware, async (req,res)=>{
    try{
      
        const userId = req.user.id;
        const {noteID} = req.params;
        
         
        const result = await usermodle.updateOne(
            { _id: userId},
            {$pull:{notes:{ _id: new mongoose.Types.ObjectId(noteID)}}}

        )
        if(result.modifiedCount === 0){
            return res.status(404).json({error:"note not found "})
        }

        const updateUser = await usermodle.findById(userId)


    }catch(error){
        res.status(500).json({error:"Server error"})
    }
})

router.get("/search", authMiddleware, async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ error: "Query parameter is required" });

        const userId = req.user.id;
        console.log("User ID:", userId); 

        const user = await usermodle.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        console.log("User Notes:", user.notes);
        const matchingNotes = user.notes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.description.toLowerCase().includes(query.toLowerCase()) ||
            (note.tages && note.tages.some(tag => tag.tage.toLowerCase().includes(query.toLowerCase())))
        );

        console.log("Matching Notes:", matchingNotes); 
        res.json(matchingNotes);
    } catch (error) {
        console.error("Error in search API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




export default router;