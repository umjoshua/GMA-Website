import express from "express"
import { RegisterEvent, GetEvents } from "../controllers/events.js"

const router = express.Router()

router.get("/", GetEvents)

router.post("/register", RegisterEvent)


export default router