import express from "express";

const router = express.Router();

router.get('/next10days',(req,res)=>{
  
    const daysOfWeek =  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const next10days = [];
  

    for (let i = 0 ;i<10;i++){
        const date = new Date();
        date.setDate(date.getDate()+i);

        next10days.push({
            dayNumber:date.getDate(),
            dayName:daysOfWeek[date.getDay()],
            month:months[date.getMonth()],
            year:date.getFullYear(),
          

        })
    }
    console.log(next10days)
   res.json(next10days);
})

export default router;