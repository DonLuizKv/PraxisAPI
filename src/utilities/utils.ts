import { randomBytes } from "node:crypto";
import { Request, Response, NextFunction } from 'express';

export const generateCode = (length = 6): string => {
    const CHARS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const bytes = randomBytes(length);
    let random: string = "";

    for (let i = 0; i < length; i++) {
        random += CHARS[bytes[i] % CHARS.length];
    }

    return random;
}

export const Time = {
    second: (n: number) => n * 1000,
    minute: (n: number) => n * 60 * 1000,
    hour: (n: number) => n * 60 * 60 * 1000,
    day: (n: number) => n * 24 * 60 * 60 * 1000,
    week: (n: number) => n * 7 * 24 * 60 * 60 * 1000,
} as const;

type fnType = (req: Request, res: Response, next: NextFunction) => Promise<any>;
type asyncHandlerType = (fn: fnType) => fnType;

export const asyncHandler: asyncHandlerType = (fn: fnType) => {
    return (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res, next)).catch(next);
}