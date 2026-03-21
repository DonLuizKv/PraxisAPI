import jwt from "jsonwebtoken";
import { User } from '../../types/user';
import { Token } from '../../types/auth';
import { Compare, Hash } from '../../utilities/password';
import { ErrorManager } from '../../lib/ErrorManager';
import { generateUID } from "../../utilities/utils";
import { UserRepository } from '../repositories/user.repository';

export class AuthService {

    private readonly JWT_SECRET: string = process.env.JWT_SECRET as string;
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async login(email: string, password: string) {

        const user: User | null = await this.userRepository.Find(email, "email");

        if (!user) {
            throw new ErrorManager("User not found", 404);
        }

        const isPasswordValid: boolean = await Compare(user.password, password);

        if (!isPasswordValid) {
            throw new ErrorManager("Invalid password", 400);
        }

        const payload: Token = {
            sub: user.uid,
            role: user.role,
        }

        const token: string = jwt.sign(payload, this.JWT_SECRET, {
            expiresIn: "24h"
        } as jwt.SignOptions);

        return {
            token,
            role: user.role
        };
    }

    public async register(username: string, email: string, password: string) {
        const user = await this.userRepository.Find(email, "email");

        if (user) {
            throw new ErrorManager("User already exists", 400);
        }

        const uid: string = generateUID("usr");
        const hashedPassword: string = await Hash(password);

        const newuser = {
            uid,
            username,
            email,
            password: hashedPassword,
        }

        await this.userRepository.Create(newuser);

    }

    public async verifySession(token: string) {
        if (!token) throw new ErrorManager("Token not provided", 401);

        const decoded: Token = jwt.verify(token, this.JWT_SECRET) as Token;

        if (decoded.role !== "admin" && decoded.role !== "student") {
            throw new ErrorManager("Invalid role", 401);
        }

        const user = await this.userRepository.Find(decoded.sub, "uid");

        if (!user) {
            throw new ErrorManager("User not found", 404);
        }

        return {
            username: user.username,
            email: user.email,
            active: user.active,
            role: user.role
        };
    }
}
