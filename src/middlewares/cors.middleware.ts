import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Logger } from "../lib/Logger";

export const corsErrorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message === "Not allowed by CORS") {
        Logger.warn(`CORS blocked request from origin: ${req.headers.origin || 'unknown'}`);
        res.status(403).json({
            error: "CORS Error",
            message: "Not allowed by CORS policy",
            origin: req.headers.origin || 'unknown'
        });
        return;
    }
    next(err);
};