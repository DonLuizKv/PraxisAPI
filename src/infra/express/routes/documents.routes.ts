import { Router } from "express";
import { RoleVerification, TokenVerification } from "../middlewares/auth.middleware";

const router = Router();

router.use(TokenVerification);
router.use(RoleVerification("admin", "student"));

router.get("/", ); // Get all documents
router.get("/:id", ); // Get document by id

router.post("/", ); // Create document

router.put("/:id", ); // Update all fields
router.patch("/:id", ); // Update unique field

router.delete("/:id", ); // Delete document

export default router;
