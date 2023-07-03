import express from "express";
import cors from "cors";
import dotenv from "dotenv"

const app = express()
dotenv.config()
app.use(cors())

app.use("/",(req,res)=>{
    res.send("hello")
})


app.listen(process.env.PORT, ()=>{
    console.log("Listening")
})