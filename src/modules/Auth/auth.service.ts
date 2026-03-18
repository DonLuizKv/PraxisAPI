import { UserRepository } from "../Users/user.repository";

export class AuthService {
    constructor(
        private UserRepository: UserRepository
    ) {}
}

