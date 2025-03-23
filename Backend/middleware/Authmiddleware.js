import Jwt from "jsonwebtoken";


const authMiddleware = (req,res,next)=> {
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decoded = Jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
    
        next()
    }catch(error){
        res.status(401).json({message:'invalid token'})
    }
}

export default authMiddleware;