import express from "express"

const router = express.Router()

router.get("/list",(req,res)=>{
    res.send("get events")
})

router.post("/register/:id",(req,res)=>{
    res.send("register for events")
})


export default router