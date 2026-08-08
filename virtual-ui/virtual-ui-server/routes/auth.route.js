import express from "express"
import { googleSignup, logOut } from "../controllers/auth.controller.js"



const authRouter = express.Router()

authRouter.post("/googlesignup",googleSignup)

authRouter.get("/logout",logOut)

export default authRouter