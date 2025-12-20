import { randomBytes } from "node:crypto";
import { Logger } from "../lib/Logger";

const CHARS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const validateEnvironmentVariables = (variables: string[]): void => {
    const missing = variables.filter((env) => !process.env[env]);

    if (missing.length > 0) {
        Logger.error(`Missing required environment variables: ${missing.join(", ")}`);
    }
}

export const generateUID = (prefix: string, length = 6): string => {
    const bytes = randomBytes(length);
    let random: string = "";

    for (let i = 0; i < length; i++) {
        random += CHARS[bytes[i] % CHARS.length];
    }

    return `${prefix}-${random}`;
}

export const Time = {
    second: (n: number) => n * 1000,
    minute: (n: number) => n * 60 * 1000,
    hour: (n: number) => n * 60 * 60 * 1000,
    day: (n: number) => n * 24 * 60 * 60 * 1000,
    week: (n: number) => n * 7 * 24 * 60 * 60 * 1000,
};