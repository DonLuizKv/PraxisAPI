import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Logger } from "../../lib/Logger";
import { ErrorManager } from "../../lib/ErrorManager";

export const corsErrorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message === "Not allowed by CORS") {
        Logger.warn(`CORS blocked request from origin: ${req.headers.origin || 'unknown'}`);
        throw new ErrorManager("CORS Error", 403);
    }
    next(err);
};