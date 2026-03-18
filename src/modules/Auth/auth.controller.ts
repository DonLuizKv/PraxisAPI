import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
    constructor(
        private service: AuthService
    ) {}

    async Login(req: Request, res: Response): Promise<void> {
        
    }
}
