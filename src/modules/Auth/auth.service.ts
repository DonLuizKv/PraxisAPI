import { AuthRepository } from "./auth.repository";

export class AuthService {
    constructor(
        private repository: AuthRepository
    ) {}
}

