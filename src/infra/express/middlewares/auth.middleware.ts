import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Token } from '../../types/auth';
import { Errors } from '../../lib/ErrorManager';

interface AuthenticatedRequest extends Request {
    user?: Token;
}

export const TokenVerification = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    const token = req.cookies?.session_token;
    if (!token) throw Errors.UNAUTHORIZED("Authentication required, please login.");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Token;
    req.user = decoded;
    next();
};

export const RoleVerification = (...roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw Errors.UNAUTHORIZED("Authentication required, please login.");
        }

        if (!roles.includes(req.user.role)) {
            throw Errors.FORBIDDEN("Unauthorized, you don't have permission to access this resource.");
        }

        next();
    };
};