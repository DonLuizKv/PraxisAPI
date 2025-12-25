import { ErrorManager } from "../../lib/ErrorManager";
import { User } from "../../types/user";
import { Hash } from "../../utilities/password";
import { generateUID } from "../../utilities/utils";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    constructor(
        private userRepository: UserRepository = new UserRepository()
    ) {}

    async createUser(data: Omit<User, "uid">): Promise<void> {

        const existUser = await this.userRepository.Exist(data.email, "email");

        if (existUser) {
            throw new ErrorManager("User already exists", 400);
        }

        const uid = generateUID("usr");
        const hashedPassword = await Hash(data.password);

        const payload: User = {
            uid,
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: data.role,
            active: data.active
        }

        await this.userRepository.Create(payload);

    }

    async getUser(uid: string, typeSearch: "email" | "uid"): Promise<User | null> {
        return this.userRepository.Find(uid, typeSearch);
    }

    async getUsers(limit?: number, offset?: number): Promise<User[] | null> {
        return this.userRepository.FindAll(limit, offset);
    }

    async deleteUser(id: string): Promise<boolean> {
        return true;
    }

    async updateUser(id: string, updatedUser: User): Promise<boolean> {
        return true;
    }

    async changeUserState(id: string, state: boolean): Promise<boolean> {
        return true;
    }

    async changeUserRole(id: string, role: "admin" | "student"): Promise<boolean> {
        return true;
    }
}