import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorManager } from "../../lib/ErrorManager";

export const errorHandler: ErrorRequestHandler = (err: ErrorManager, req: Request, res: Response, next: NextFunction) => {
    const { statusCode, status, message } = err;

    res.status(statusCode).json({
        statusCode,
        status,
        message: message || "Internal server error",
    });
};
