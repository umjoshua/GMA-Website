import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
import AdminRouter from "./routes/admin.js"
import EventRouter from "./routes/events.js"
import MembershipRouter from "./routes/membership.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use("/admin", AdminRouter)
app.use("/events", EventRouter)
app.use("/membership", MembershipRouter)

mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log("DB Connected and listening")
    })
}).catch((error) => {
    console.log(error)
})