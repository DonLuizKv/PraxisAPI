import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { createAuthRoutes } from "./auth.routes";
import { UsersRepository } from "../Users/users.repository";
import { Database } from "../../infra/database/Database";

interface AuthModuleDependences {
    db: Database;
}

export class AuthModule {
    static create(dependences: AuthModuleDependences) {
        const userRepo = new UsersRepository(dependences.db);
        const service = new AuthService(userRepo);
        const controller = new AuthController(service);

        const router = createAuthRoutes(controller);

        return router;
    }
}