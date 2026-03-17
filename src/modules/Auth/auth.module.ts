import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { createAuthRoutes } from "./auth.routes";

export class AuthModule {
    static create() {
        const repository = new AuthRepository();
        const service = new AuthService(repository);
        const controller = new AuthController(service);

        const router = createAuthRoutes(controller);

        return router;
    }
}