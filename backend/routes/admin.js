import express from "express"
import { adminLogin } from "../controllers/login.js"
import AuthMiddleware from "../middleware/auth.js"

const router = express.Router()

router.get("/getEventRegs/:id", (req, res) => {
    res.send("admin: get eventregs by id")
})

router.post("/login", adminLogin)

router.post("/event", AuthMiddleware, (req, res) => {
    res.send("post event")
})

router.get("/membership", AuthMiddleware, (req, res) => {
    res.send("get membership")
})

export default router