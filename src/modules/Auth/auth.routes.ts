import { Router } from "express";
import { AuthController } from "./auth.controller";

export function createAuthRoutes(controller: AuthController) {
    const router = Router();

    router.post("/", controller.Login);

    return router;
}