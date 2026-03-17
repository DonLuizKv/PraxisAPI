import { Router } from "express";
import { AuthController } from "./auth.controller";

export function createAuthRoutes(controller: AuthController) {
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
}