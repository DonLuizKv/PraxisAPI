import express from "express";
import { Login, Register, VerifySession, Logout } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/verify", VerifySession);
router.post("/logout", Logout)

export default router; 