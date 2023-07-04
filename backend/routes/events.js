import express from "express"
import { RegisterEvent } from "../controllers/events.js"

const router = express.Router()

router.get("/list", (req, res) => {
    res.send("get events")
})

router.post("/register/:id", RegisterEvent)


export default router