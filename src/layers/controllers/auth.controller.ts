import { Request, Response } from 'express';
import { Time } from '../../utilities/utils';
import { AuthService } from '../services/auth.service';
import { ErrorManager } from '../../lib/ErrorManager';

const service = new AuthService();

export const Login = async (req: Request, res: Response): Promise<any> => {

    const { email, password } = req.body;
    const { token, role } = await service.login(email, password);

    res.cookie("session_token", token, {
        secure: true,
        sameSite: "none",
        httpOnly: true,
        maxAge: Time.day(1),
        path: "/"
    });

    res.status(200).json(role);
};

export const Register = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    await service.register(email, password);

    res.status(200).json("User created successfully");
};

export const VerifySession = async (req: Request, res: Response): Promise<any> => {
    const token = req.cookies?.session_token;
    if (!token) throw new ErrorManager("Token cookie required", 403);

    const user = await service.verifySession(token);
    res.status(200).json(user);
};

export const Logout = async (req: Request, res: Response): Promise<any> => {
    res.clearCookie("session_token");

    res.status(200).json("Session successfully closed");
}; 