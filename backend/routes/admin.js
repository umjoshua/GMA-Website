import express from "express"
import { adminLogin } from "../controllers/admin.js"
import AuthMiddleware from "../middleware/auth.js"
import { CreateEvent, AddCommittee, DeleteCommittee, DeleteEvent, UpdateEvent } from '../controllers/admin.js'

const router = express.Router()

router.get("/getEventRegs/:id", (req, res) => {
    res.send("admin: get eventregs by id")
})

router.post("/login", adminLogin)

router.post("/event", AuthMiddleware, CreateEvent)

router.delete("/event/:id", AuthMiddleware, DeleteEvent)

router.patch("/event/:id", AuthMiddleware, UpdateEvent)

router.post("/committee", AuthMiddleware, AddCommittee)

router.delete("/committee/:id", AuthMiddleware, DeleteCommittee)


router.get('/', AuthMiddleware, (req, res) => {
    res.status(200).json("success")
})


router.get("/membership", AuthMiddleware, (req, res) => {
    res.send("get membership")
})

export default router