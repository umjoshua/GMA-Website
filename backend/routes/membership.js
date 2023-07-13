import express from "express"
import { MembershipRegister } from "../controllers/membership.js"

const router = express.Router()

router.post("/", MembershipRegister)

export default router