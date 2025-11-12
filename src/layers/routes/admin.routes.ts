import express from "express";
import { CreateAdmin, GetAdmins, GetAdminById, UpdateAdmin, DeleteAdmin } from "../controllers/admin.controller";
import { TokenVerification } from "../../middlewares/auth.middleware";

const router = express.Router();

router.use(TokenVerification);

router.post("/", CreateAdmin);
router.get("/", GetAdmins);
router.get("/:id", GetAdminById);
router.put("/:id", UpdateAdmin);
router.delete("/:id", DeleteAdmin);

export default router;