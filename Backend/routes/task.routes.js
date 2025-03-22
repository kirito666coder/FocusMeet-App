import express from "express";

const router = express.Router();

router.get('/next10days',(req,res)=>{
  
    const daysOfWeek =  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const next10days = [];

    for (let i = 0 ;i<10;i++){
        const date = new Date();
        date.setDate(date.getDate()+i);

        next10days.push({
            dayNumber:date.getDate(),
            dayName:daysOfWeek[date.getDay()],
        })
    }
    console.log(next10days)
   res.json(next10days);
})

export default router;