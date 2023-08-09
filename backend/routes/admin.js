import express from "express"
import { AddGalleryImage, DeleteGalleryImage, adminLogin } from "../controllers/admin.js"
import AuthMiddleware from "../middleware/auth.js"
import { CreateEvent, AddCommittee, DeleteCommittee, DeleteEvent, UpdateEvent,GetEventsList,GetEventRegData } from '../controllers/admin.js'

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

router.post("/gallery", AuthMiddleware, AddGalleryImage)

router.delete("/gallery/:id", AuthMiddleware, DeleteGalleryImage)

router.get("/events",AuthMiddleware,GetEventsList)

router.get("/eventRegistrations/:id",AuthMiddleware,GetEventRegData)

router.get('/', AuthMiddleware, (req, res) => {
    res.status(200).json("success")
})


router.get("/membership", AuthMiddleware, (req, res) => {
    res.send("get membership")
})

export default router