import { UsersRepository } from "../Users/users.repository";

export class AuthService {
    constructor(
        private UserRepository: UsersRepository
    ) {}
}

