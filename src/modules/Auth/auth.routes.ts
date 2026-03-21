import { Router } from "express";
import { AuthController } from "./auth.controller";
import { asyncHandler } from "../../utilities/utils";

export function createAuthRoutes(controller: AuthController) {
    const router = Router();

    router.post("/login", asyncHandler(controller.Login));
    router.post("/register", asyncHandler(controller.Register));
    router.post("/logout", asyncHandler(controller.Logout));
    router.post("/refresh", asyncHandler(controller.Refresh));
    router.post("/verify", asyncHandler(controller.Verify));

    router.post("/2fa/enable", asyncHandler(controller.Enable2FA));
    router.post("/2fa/disable", asyncHandler(controller.Disable2FA));
    router.post("/2fa/verify", asyncHandler(controller.Verify2FA));

    router.post("/forgot-password", asyncHandler(controller.ForgotPassword));
    router.post("/reset-password", asyncHandler(controller.ResetPassword));
    router.patch("/change-password", asyncHandler(controller.ChangePassword));

    return router;
}