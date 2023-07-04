import express from "express"

const router = express.Router()

router.post("/register/new",(req,res)=>{
    res.send("register for mebmership")
})


export default router