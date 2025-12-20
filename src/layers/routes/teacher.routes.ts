import express from "express";
import { TokenVerification } from "../../middlewares/auth.middleware";
import { GetTeachers, GetTeacherById, UpdateTeacher, DeleteTeacher } from "../controllers/teacher.controller";

const router = express.Router();

router.use(TokenVerification);

router.get("/", GetTeachers);
router.get("/:id", GetTeacherById);
router.put("/:id", UpdateTeacher);
router.delete("/:id", DeleteTeacher);

export default router;
