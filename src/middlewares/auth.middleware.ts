import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Token } from '../types/auth';
import { ErrorManager } from '../lib/ErrorManager';

interface AuthenticatedRequest extends Request {
    user?: Token;
}

export const TokenVerification = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    const token = req.cookies?.session_token;
    if (!token) throw new ErrorManager("Unauthorized, you need a valid Token.", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Token;
    req.user = decoded;
    next();
};

export const RoleVerification = (...roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new ErrorManager("Authentication required, please login.", 401);
        }

        if (!roles.includes(req.user.role)) {
            throw new ErrorManager("Unauthorized, you don't have permission to access this resource.", 403);
        }

        next();
    };
};