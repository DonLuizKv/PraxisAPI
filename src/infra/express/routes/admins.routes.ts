import { Router } from "express";
import { RoleVerification, TokenVerification } from "../middlewares/auth.middleware";

const router = Router();

router.use(TokenVerification);
router.use(RoleVerification("admin"));

router.get("/", ); // Get all admins
router.get("/:id", ); // Get admin by id

router.post("/", ); // Create admin

router.put("/:id", ); // Update all fields
router.patch("/:id", ); // Update unique field

router.delete("/:id", ); // Delete admin

export default router;
