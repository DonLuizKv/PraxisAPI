import { Request, Response } from 'express';
import { ErrorResponse, Time } from '../../utilities/utils';
import { AuthService } from '../services/auth.service';

const service = new AuthService();

export const Login = async (req: Request, res: Response): Promise<any> => {
    try {
        const auth = await service.login(req.body);

        res.cookie("session_token", auth.token, {
            secure: true,
            sameSite: "none",
            httpOnly: true,
            maxAge: Time.day(1),
            path: "/"
        });

        return res.status(200).json({ status: true, role: auth.role });
    } catch (error: any) {
        const { body, statusCode } = ErrorResponse(error, ["Invalid", "not found"], "Error trying to login");
        return res.status(statusCode).json(body);
    }
};

export const Register = async (req: Request, res: Response): Promise<any> => {
    try {
        await service.register(req.body);
        return res.status(200).json({ message: "User created successfully" });
    } catch (error: any) {
        console.log(error);
        const { body, statusCode } = ErrorResponse(error, ["Required", "already exists", "Not valid role", "not found", "normalizing"], "Error trying to register");
        return res.status(statusCode).json(body);
    }
};

export const VerifySession = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.cookies?.session_token;

        if (!token) return res.status(403).json({ error: "Token cookie required" });

        const result = await service.verifySession(token);
        return res.status(200).json(result);

    } catch (error: any) {
        const { body, statusCode } = ErrorResponse(error, ["Invalid", "not found"], "Error trying to verify session");
        return res.status(statusCode).json(body);
    }
};

export const Logout = async (req: Request, res: Response): Promise<any> => {
    try {
        res.clearCookie("session_token");
        return res.status(200).json({
            message: 'Session successfully closed',
        });
    } catch (error: any) {
        const { body, statusCode } = ErrorResponse(error, "", "");
        return res.status(statusCode).json(body);
    }
}; 