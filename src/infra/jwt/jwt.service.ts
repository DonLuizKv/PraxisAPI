import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Env } from "../../config/Env";
import { Token } from "../types/auth";
import { Errors } from "../lib/ErrorManager";

// 🔹 Helper base para firmar tokens
const sign = (
    payload: Token,
    secret: string,
    expiresIn: SignOptions["expiresIn"] // que expires in sea exactamente como lo dice el propio jwt
): string => {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, secret, options);
};

// 🔹 Type guard (validación runtime)
const isToken = (payload: any): payload is Token => {
    return (
        typeof payload === "object" && payload !== null && typeof payload.sub === "number" &&
        (payload.role === "admin" || payload.role === "student")
    );
};

// 🔹 Verificar token (seguro)
export const verifyToken = (token: string, secret: string): Token => {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string" || !isToken(decoded)) {
        throw new Error("Invalid token payload");
    }

    return decoded;
};

// 🔹 Decode (sin validar firma)
export const decodeToken = (token: string): Token | null => {
    const decoded = jwt.decode(token);

    if (!isToken(decoded)) return null;

    return decoded;
};

// 🔹 Tokens específicos
export const generateAccessToken = (payload: Token): string => {
    return sign(payload, Env.JWT.ACCESS_SECRET, Env.JWT.ACCESS_EXPIRES_IN);
};

export const generateRefreshToken = (payload: Token): string => {
    return sign(payload, Env.JWT.REFRESH_SECRET, Env.JWT.REFRESH_EXPIRES_IN);
};