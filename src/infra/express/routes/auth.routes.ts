import { Router } from "express";

const router = Router();

router.post("/login", );
router.post("/register", );
router.post("/logout", );
router.post("/refresh", );
router.post("/verify", );

router.post("/2fa/enable", );
router.post("/2fa/disable", );
router.post("/2fa/verify", );

router.post("/forgot-password", );
router.post("/reset-password", );
router.patch("/change-password", );

export default router;