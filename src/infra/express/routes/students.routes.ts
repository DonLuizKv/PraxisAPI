import { Router } from "express";
import { RoleVerification, TokenVerification } from "../middlewares/auth.middleware";

const router = Router();

router.use(TokenVerification);
router.use(RoleVerification("admin", "student"));

router.get("/", ); // Get all students
router.get("/:id", ); // Get student by id

router.post("/", ); // Create student

router.put("/:id", ); // Update all fields
router.patch("/:id", ); // Update unique field

router.delete("/:id", ); // Delete student

export default router;
