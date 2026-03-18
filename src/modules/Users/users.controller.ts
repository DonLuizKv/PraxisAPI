import { Request, Response } from "express";
import { UsersService } from "./users.service";

export class UsersController {
    constructor(
        private service: UsersService
    ) {}

    async getAll(req: Request, res: Response) {
        
    }

    async getById(req: Request, res: Response) {
        
    }

    async create(req: Request, res: Response) {
        
    }

    async update(req: Request, res: Response) {
        
    }

    async delete(req: Request, res: Response) {
        
    }
}
