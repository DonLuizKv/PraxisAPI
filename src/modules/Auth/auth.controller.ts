import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Time } from "../../utilities/utils";
import { Errors } from "../../infra/lib/ErrorManager";

export class AuthController {
    constructor(
        private service: AuthService
    ) { }

    async Login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const { role, access, refresh } = await this.service.login(email, password);

        res.cookie("refresh_token", refresh, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: Time.day(3),
            path: "/",
        });

        res.status(200).json({ access, role });
    }

    async Register(req: Request, res: Response): Promise<void> {
        const { username, identification, email, password } = req.body;

        await this.service.register(username, identification, email, password);

        res.status(201).json("User registered successfully");
    }

    async Verify(req: Request, res: Response): Promise<void> {
        const accessToken = req.headers.authorization?.split(' ')[1] as string;

        if (!accessToken) throw Errors.UNAUTHORIZED("No access token");

        const userData = await this.service.verify(accessToken);
        res.status(200).json(userData);
    }

    async Refresh(req: Request, res: Response): Promise<void> {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) throw Errors.UNAUTHORIZED("No session found");

        const newAccessToken = await this.service.refresh(refreshToken);
        res.status(200).json(newAccessToken);
    }

    async Logout(req: Request, res: Response): Promise<void> {
        res.clearCookie("refresh_token", {
            secure: true,
            sameSite: "none",
            httpOnly: true,
            path: "/"
        });
        res.status(200).json("Session successfully closed");
    }

    async Enable2FA(req: Request, res: Response): Promise<void> {

    }

    async Disable2FA(req: Request, res: Response): Promise<void> {

    }

    async Verify2FA(req: Request, res: Response): Promise<void> {

    }

    async ForgotPassword(req: Request, res: Response): Promise<void> {
        const { email } = req.body;

        await this.service.forgotPassword(email);

        res.status(200).json("If the email exists, a code was sent");
    }

    async ResetPassword(req: Request, res: Response): Promise<void> {
        const { code, password } = req.body;

        await this.service.resetPassword(code, password);

        res.status(200).json("Password reset successfully");
    }

    async ChangePassword(req: Request, res: Response): Promise<void> {
        const { oldPassword, newPassword } = req.body;
        const accessToken = req.headers.authorization?.split(' ')[1] as string;

        if (!accessToken) throw Errors.UNAUTHORIZED("No access token");

        await this.service.changePassword(accessToken, oldPassword, newPassword);

        res.status(200).json("Password changed successfully");
    }
}
