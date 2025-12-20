import express from "express";
import { CreateUser, DeleteUser, GetUsers, GetUserById, UpdateUser, ChangeRole, ChangeStateUser } from "../controllers/user.controller";
import { TokenVerification } from "../../middlewares/auth.middleware";
import { RoleVerification } from "../../middlewares/auth.middleware";

const router = express.Router();

router.use(TokenVerification);
router.use(RoleVerification("admin"));

router.post("/users", CreateUser);
router.get("/users", GetUsers);
router.get("/users/:id", GetUserById);
router.put("/users/:id", UpdateUser);
router.delete("/users/:id", DeleteUser);
router.patch("/users/:id/role", ChangeRole);
router.patch("/users/:id/state", ChangeStateUser);

export default router;