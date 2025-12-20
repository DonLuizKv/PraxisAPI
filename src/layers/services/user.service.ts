import { User } from "../../types/user";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    constructor(
        private userRepository: UserRepository = new UserRepository()
    ) {}

    async createUser(user: User): Promise<void> {
        await this.userRepository.Create(user);
    }

    async getUser(uid: string, typeSearch: "email" | "uid"): Promise<User | null> {
        return this.userRepository.Find(uid, typeSearch);
    }

    async getUsers(limit?: number, offset?: number): Promise<User[] | null> {
        return this.userRepository.FindAll(limit, offset) || null;
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.Delete(id);
    }

    async updateUser(id: string, updatedUser: User): Promise<boolean> {
        return this.userRepository.Update(id, updatedUser);
    }

    async changeUserState(id: string, state: boolean): Promise<boolean> {
        return this.userRepository.Update(id, { state });
    }

    async changeUserRole(id: string, role: "admin" | "student"): Promise<boolean> {
        return this.userRepository.Update(id, { role });
    }
}