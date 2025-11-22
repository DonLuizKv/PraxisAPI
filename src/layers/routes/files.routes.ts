import express from "express";
import { TokenVerification, isAdmin } from "../../middlewares/auth.middleware";
import upload from "../../middlewares/upload.middleware";

const router = express.Router();

router.use(TokenVerification);

router.post("/documents", upload.single("file"));
router.post("/binnacles", upload.single("file"));

router.get("/documents/:id");
router.get("/binnacles/:id");

router.get("/documents", );
router.get("/binnacles", );

router.put("/documents/:id", upload.single("file"));
router.put("/binnacles/:id", upload.single("file"));

router.delete("/documents/:id");
router.delete("/binnacles/:id");


export default router; 