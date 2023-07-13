import express from "express"
import { GetCommittee } from "../controllers/committee.js"

const router = express.Router()

router.get("/", GetCommittee)

export default router