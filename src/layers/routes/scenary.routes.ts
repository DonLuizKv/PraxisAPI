import express from "express";
import { TokenVerification, isAdmin } from "../../middlewares/auth.middleware";

const router = express.Router();

router.use(TokenVerification);

router.post("/", );
router.get("/", );
router.get("/:id", );
router.put("/:id", );
router.delete("/:id", );


export default router;