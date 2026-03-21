import { UsersRepository } from "../Users/users.repository";
import { User } from "../../infra/types/user";
import { Errors } from "../../infra/lib/ErrorManager";
import { Compare, Hash } from "../../utilities/password";
import { Token } from "../../infra/types/auth";
import jwt from "jsonwebtoken";
import { Env } from "../../config/Env";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../infra/jwt/jwt.service";
import { TokenRepository } from "./token.repository";
import { Time } from "../../utilities/utils";

export class AuthService {
    constructor(
        private UserRepository: UsersRepository,
        private TokenRepository: TokenRepository
    ) { }

    async login(email: string, password: string): Promise<{ access: string; refresh: string; role: string }> {
        const user: User | null = await this.UserRepository.FindByEmail(email);

        if (!user) {
            throw Errors.BAD_REQUEST("User not found");
        }

        const isPasswordValid: boolean = await Compare(user.password, password);

        if (!isPasswordValid) {
            throw Errors.BAD_REQUEST("Invalid password");
        }

        const payload: Token = {
            sub: user.id,
            role: user.role,
        }

        const AccessToken = generateAccessToken(payload); // mi llave
        const RefreshToken = generateRefreshToken(payload); // mi tarjeta

        await this.TokenRepository.CreateToken(RefreshToken, user.id, new Date(Date.now() + Time.day(3)));

        return {
            access: AccessToken,
            refresh: RefreshToken,
            role: user.role
        };
    }

    async register(username: string, identification: string, email: string, password: string): Promise<void> {
        const user = await this.UserRepository.FindByEmail(email);

        if (user) {
            throw Errors.BAD_REQUEST("User already exists");
        }

        const hashedPassword: string = await Hash(password);

        const newUser: Omit<User, "id"> = {
            username,
            email,
            password: hashedPassword,
            active: true,
            role: "student",
        }

        await this.UserRepository.CreateUser(newUser);
    }

    async verify(token: string): Promise<{ username: string; email: string; active: boolean; role: string }> {
        if (!token) throw Errors.UNAUTHORIZED("Token not provided");

        const decoded = verifyToken(token, Env.JWT.ACCESS_SECRET);
        
        if (decoded.role !== "admin" && decoded.role !== "student") {
            throw Errors.UNAUTHORIZED("Invalid role");
        }

        const user = await this.UserRepository.FindById(decoded.sub);

        if (!user) {
            throw Errors.NOT_FOUND("User not found");
        }

        return {
            username: user.username,
            email: user.email,
            active: user.active,
            role: user.role
        };
    }

    async enable2FA() {
        return;
    }

    async disable2FA() {
        return;
    }

    async verify2FA() {
        return;
    }

    async forgotPassword() {
        return;
    }

    async resetPassword() {
        return;
    }

    async changePassword() {
        return;
    }
}

