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
        const token = req.cookies?.session_token;
        if (!token) throw Errors.UNAUTHORIZED("Token cookie required");

        const user = await this.service.verify(token);
        res.status(200).json(user);
    }

    async Refresh(req: Request, res: Response): Promise<void> {

    }

    async Logout(req: Request, res: Response): Promise<void> {
        res.clearCookie("session_token", {
            secure: true,
            sameSite: "none",
            httpOnly: true,
            maxAge: Time.day(1),
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

    }

    async ResetPassword(req: Request, res: Response): Promise<void> {

    }

    async ChangePassword(req: Request, res: Response): Promise<void> {

    }
}
