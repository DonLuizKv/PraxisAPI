import { UsersRepository } from "../Users/users.repository";
import { User } from "../../infra/types/user";
import { Errors } from "../../infra/lib/ErrorManager";
import { Compare, Hash } from "../../utilities/password";
import { Token } from "../../infra/types/auth";
import { Env } from "../../config/Env";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../infra/jwt/jwt.service";
import { TokenRepository } from "./token.repository";
import { generateCode, Time } from "../../utilities/utils";
import { RecoveryCodesRepository } from "./recoveryCodes.repository";

export class AuthService {
    constructor(
        private UserRepository: UsersRepository,
        private TokenRepository: TokenRepository,
        private RecoveryCodesRepository: RecoveryCodesRepository
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

        await this.TokenRepository.SaveToken(RefreshToken, user.id, new Date(Date.now() + Time.day(3)));

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

    async refresh(refreshToken: string): Promise<string> {
        const decoded = verifyToken(refreshToken, Env.JWT.REFRESH_SECRET);

        if (decoded.role !== "admin" && decoded.role !== "student") {
            throw Errors.UNAUTHORIZED("Invalid role");
        }

        const token = await this.TokenRepository.FindTokenByUserID(decoded.sub);

        if (!token) {
            throw Errors.UNAUTHORIZED("Invalid session, please login again");
        }

        if (token.expires_at < new Date()) {
            throw Errors.UNAUTHORIZED("Token expired, please login again");
        }

        const newAccessToken = generateAccessToken({
            sub: token.userID,
            role: decoded.role
        });

        return newAccessToken;
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

    async forgotPassword(email: string): Promise<void> {
        const user = await this.UserRepository.FindByEmail(email);

        if (!user) throw Errors.NOT_FOUND("If the email exists, a code was sent")

        const code = generateCode();
        const hashedCode = await Hash(code);

        await this.RecoveryCodesRepository.SaveCode(hashedCode, user.id, new Date(Date.now() + Time.minute(10)));

        // await this.mailer.sendResetCode(email, code);
    }

    async resetPassword(code: string, password: string): Promise<void> {
        const oldCode = await this.RecoveryCodesRepository.FindCodeByCode(code);

        if (!oldCode) throw Errors.NOT_FOUND("Invalid code");

        if (oldCode.expires_at < new Date()) throw Errors.UNAUTHORIZED("Code expired, please login again");

        const newPassword = await Hash(password);

        await this.UserRepository.UpdateUser(oldCode.userID, { password: newPassword });

        await this.RecoveryCodesRepository.DeleteCode(oldCode.id);
    }

    async changePassword(accessToken: string, oldPassword: string, newPassword: string): Promise<void> {
        const decoded = verifyToken(accessToken, Env.JWT.ACCESS_SECRET);

        if (decoded.role !== "admin" && decoded.role !== "student") {
            throw Errors.UNAUTHORIZED("Invalid role");
        }

        const user = await this.UserRepository.FindById(decoded.sub);

        if (!user) {
            throw Errors.NOT_FOUND("User not found");
        }

        const isPasswordValid: boolean = await Compare(user.password, oldPassword);

        if (!isPasswordValid) {
            throw Errors.BAD_REQUEST("Invalid password");
        }

        const newPasswordHashed = await Hash(newPassword);

        await this.UserRepository.UpdateUser(user.id, { password: newPasswordHashed });
    }
}

