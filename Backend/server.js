import express from "express"

import userroute from "./routes/user.routes.js";
import taskroute from "./routes/task.routes.js";
import noteroute from "./routes/note.routes.js"

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
    methods:['GET','POST','PUT','DELETE']
    
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user",userroute)
app.use("/task",taskroute)
app.use("/note",noteroute)



app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})