import express from "express"
import {
    ContactUs,
    GetCommittee,
    GetEvents,
    MembershipRegister,
    GetGallery,
    RegisterEvent,
    GetSwiperData
} from "../controllers/user.js"

const router = express.Router()

router.get("/events", GetEvents)

router.get("/gallery", GetGallery)

router.get("/swiper", GetSwiperData)

router.get("/committee", GetCommittee)

router.post("/events", RegisterEvent)

router.post("/membership", MembershipRegister)

router.post("/contactus", ContactUs)

export default router