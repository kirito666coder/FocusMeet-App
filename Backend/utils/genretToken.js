import Jwt from "jsonwebtoken";

const genretToken= (user)=>{
   return Jwt.sign({id:user._id},process.env.JWT_SECRET)
}

export default genretToken;