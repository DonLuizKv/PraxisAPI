import express from "express";
import { Login, Register, VerifySession, Logout } from "../controllers/auth.controller";
import { AuthLimiter } from "../../middlewares/rateLimiter.middleware";

const router = express.Router();

router.use(AuthLimiter)

router.post("/login", Login);
router.post("/register", Register);

router.get("/verify", VerifySession);
router.post("/logout", Logout)

export default router; 