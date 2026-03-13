import { Router } from "express";
import { RoleVerification, TokenVerification } from "../middlewares/auth.middleware";

const router = Router();

router.use(TokenVerification);
router.use(RoleVerification("admin", "student"));

router.get("/", ); // Get all binnacles
router.get("/:id", ); // Get binnacle by id

router.post("/", ); // Create binnacle

router.put("/:id", ); // Update all fields
router.patch("/:id", ); // Update unique field

router.delete("/:id", ); // Delete binnacle

export default router;
