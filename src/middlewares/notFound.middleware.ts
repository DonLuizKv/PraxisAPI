import { Request, Response } from "express";
import { ErrorManager } from "../lib/ErrorManager.js";

export const notFound = (req: Request, res: Response) => {
    throw new ErrorManager(`Route not found: ${req.url}`, 404);
};
