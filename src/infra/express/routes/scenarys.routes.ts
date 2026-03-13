import { Router } from "express";
import { RoleVerification, TokenVerification } from "../middlewares/auth.middleware";

const router = Router();

router.use(TokenVerification);
router.use(RoleVerification("admin", "student"));

router.get("/", ); // Get all scenarys
router.get("/:id", ); // Get scenary by id

router.post("/", ); // Create scenary

router.put("/:id", ); // Update all fields
router.patch("/:id", ); // Update unique field

router.delete("/:id", ); // Delete scenary

export default router;
