import { Router } from "express";
import { RoleVerification, TokenVerification } from "../middlewares/auth.middleware";

const router = Router();

router.use(TokenVerification);
router.use(RoleVerification("owner"));

router.get("/", ); // Get all users
router.get("/:id", ); // Get user by id

router.post("/", ); // Create user

router.put("/:id", ); // Update all fields
router.patch("/:id", ); // Update unique field

router.delete("/:id", ); // Delete user

export default router;
