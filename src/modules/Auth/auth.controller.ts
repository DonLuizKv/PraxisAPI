import { AuthService } from "./auth.service";

export class AuthController {
    constructor(
        private service: AuthService
    ) {}
}
