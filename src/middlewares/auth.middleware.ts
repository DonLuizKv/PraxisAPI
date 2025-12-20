import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Token } from '../types/auth';

interface AuthenticatedRequest extends Request {
    user?: Token;
}

export const TokenVerification = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    try {
        const token = req.cookies?.session_token;
        if (!token) return res.status(401).json({ message: "Unauthorized, you need a Token." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Token;
        req.user = decoded;
        next();

    } catch (error: unknown) {
        return res.status(401).json({ error: "Invalid or expired Token" });
    }
};

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    if (req.user && req.user?.role === "admin") {
        return next();
    }

    return res.status(403).json({ error: 'Administrator privileges are required' });
};

export const isStudent = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    if (req.user && req.user?.role === 'student') {
        return next();
    }
    return res.status(403).json({ error: 'Student privileges are required' });
};
