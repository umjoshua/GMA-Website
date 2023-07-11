import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
import AdminRouter from "./routes/admin.js"
import EventRouter from "./routes/events.js"
import CommitteeRouter from './routes/committee.js'
import MembershipRouter from "./routes/membership.js"
import PaymentHandler from './controllers/payment.js'
import bodyParser from "body-parser";

dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use("/admin", AdminRouter)
app.use("/events", EventRouter)
app.use("/membership", MembershipRouter)
app.use("/committee", CommitteeRouter)
app.post("/payment", PaymentHandler)

mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log("DB Connected and listening")
    })
}).catch((error) => {
    console.log(error)
})