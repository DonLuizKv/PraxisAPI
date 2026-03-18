import { UsersRepository } from "./users.repository";

export class UsersService {
    constructor(
        private repository: UsersRepository
    ) {}
}

