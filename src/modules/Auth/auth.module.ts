import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { createAuthRoutes } from "./auth.routes";
import { UsersRepository } from "../Users/users.repository";
import { Database } from "../../infra/database/Database";
import { Router } from "express";
import { TokenRepository } from "./token.repository";

interface AuthModuleDependences {
    db: Database;
}

export class AuthModule {
    static create(dependences: AuthModuleDependences): Router {
        const userRepo = new UsersRepository(dependences.db);
        const tokenRepo = new TokenRepository(dependences.db);

        const service = new AuthService(userRepo, tokenRepo);
        const controller = new AuthController(service);

        const router = createAuthRoutes(controller);

        return router;
    }
}