import { Router } from "express";
import { RoleVerification, TokenVerification } from "../middlewares/auth.middleware";

const router = Router();

router.use(TokenVerification);
router.use(RoleVerification("admin", "student"));

router.get("/", ); // Get all cvs
router.get("/:id", ); // Get cv by id

router.post("/", ); // Create cv

router.put("/:id", ); // Update all fields
router.patch("/:id", ); // Update unique field

router.delete("/:id", ); // Delete cv

export default router;
