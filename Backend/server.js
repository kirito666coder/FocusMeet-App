import express from "express"

import userroute from "./routes/user.routes.js";

import cors from "cors"

import mongoDb from "./config/db.js";
import cookieParser from "cookie-parser";

mongoDb()

const app = express();
const port = 3000;
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user",userroute)




app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})