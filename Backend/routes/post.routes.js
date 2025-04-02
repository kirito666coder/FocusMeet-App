import express from "express";
import authMiddleware from "../middleware/Authmiddleware.js";
import usermodel from "../model/user.model.js";
import multer from "multer";
import postModel from "../model/post.modle.js";
import user from "../model/user.model.js";


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "postuploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const postuploads = multer({ storage: storage })

router.post("/post", authMiddleware, postuploads.single("postimage"), async (req, res) => {
    try {

        const userId = req.user.id;

        const user = usermodel.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const { heading } = req.body;

        if (!heading) {
            return res.status(400).json({ message: "Heading in  require" })
        }
        if (!req.file) {
            return res.status(400).json({ message: "image is required" })
        }

        const newPost = new postModel({
            userid: userId,
            heading,
            postimage: req.file.path.replace(/\\/g, "/"),
        })

        await newPost.save();
        res.status(201).json({ message: "Post created successfully" })


    } catch (error) {
        res.status(500).json({ message: "internal server error" })

    }
})


router.get("/getpost", authMiddleware, async (req, res) => {
    try {

        const userid = req.user.id;

        const posts = await postModel.find({ userid })


        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }

})

router.put("/likes/:postid", authMiddleware, async (req, res) => {

    const postid = req.params.postid

    const post = await postModel.findById(postid)

    if (!post) return res.status(404).json({ message: "Post not found" })

    const userId = req.user.id;

    if (post.likes.includes(userId)) {
        post.likes = post.likes.filter(id => id.toString() !== userId)
    } else {
        post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes })

})


router.post("/coment/:postid", authMiddleware, async (req, res) => {

    const { coment } = req.body;
    const User = req.user.id;
    const postid = req.params.postid;

    const post = await postModel.findById(postid);
    if (!post) return res.status(404).json({ message: "post not found" })

    const user = await usermodel.findById(User)
    if (!user) return res.status(404).json({ message: 'user not found' })

    post.coments.push({
        userid: User,
        username: user.username,
        profilepic: user.profilepic,
        coment,
    })

    await post.save();



})

router.get("/allpost", async (req, res) => {
    try {

        const posts = await postModel.find()
            .populate("userid", "username profilepic")
            .populate("coments.userid", "username profilepic")
            .sort({ createdAt: -1 });

        res.json(posts)

    }catch (error){
        console.error("error fetching posts:",error)
        res.status(500).json({message:"server error"})
    }



})

router.delete("/delete-post/:postid", async (req,res)=>{
     
    const {postid} = req.params;
    
    await postModel.findByIdAndDelete(postid)
    res.status(200).json({message:"post deleted"})
})

router.delete('/delete-comment/:postid/:commentid', async (req,res)=>{

try{

    const {postid,commentid} = req.params;
    
    const post = await postModel.findByIdAndUpdate(
        postid,
        {$pull:{coments:{_id:commentid}}},
        {new:true}, 
    )
    
    if(!post){
        return res.status(404).json({message:"post not found"})
    }
   
    
    res.status(200).json({message:"user deleted"})
}catch(error){
    res.status(500).json({message:"error form server:",error})
}


})

router.get('/most-like-post', async (req,res)=>{

    const post = await postModel 
    .findOne()
    .sort({likes: -1})
    .populate("userid","username profilepic")
    .lean()

    if(!post){
        res.status(404).json({message:'post not found'})
    }
   
    res.json(post)
})

export default router;