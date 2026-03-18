import { Router } from "express";
import { UsersController } from "./users.controller";

export function createUsersRoutes(controller: UsersController) {
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id",  controller.getById);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
}