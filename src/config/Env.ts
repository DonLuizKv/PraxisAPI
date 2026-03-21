import { config } from "dotenv";
import { Errors } from "../infra/lib/ErrorManager";

config();

export const Env = {
    Global: {
        PORT: number("PORT", 4000),
        NODE_ENV: process.env.NODE_ENV ?? "dev",
        ORIGINS: list("ORIGINS"),
    },

    DB: {
        HOST: required("DB_HOST"),
        PORT: number("DB_PORT", 5432),
        USER: required("DB_USER"),
        PASSWORD: required("DB_PASSWORD"),
        NAME: required("DB_NAME"),
    },

    JWT: {
        ACCESS_SECRET: required("JWT_ACCESS_SECRET"),
        REFRESH_SECRET: required("JWT_REFRESH_SECRET"),
        ACCESS_EXPIRES_IN: number("JWT_ACCESS_EXPIRES_IN", 60 * 60 * 24 * 7),
        REFRESH_EXPIRES_IN: number("JWT_REFRESH_EXPIRES_IN", 60 * 60 * 24 * 30),
    },

    Cloudinary: {
        CLOUD_NAME: required("CLOUDINARY_CLOUD_NAME"),
        API_KEY: required("CLOUDINARY_API_KEY"),
        API_SECRET: required("CLOUDINARY_API_SECRET"),
    },

    // Mail: {
    //     HOST: required("MAIL_HOST"),
    //     PORT: number("MAIL_PORT", 587),
    //     USER: required("MAIL_USER"),
    //     PASSWORD: required("MAIL_PASSWORD"),
    //     FROM: required("MAIL_FROM"),
    // },
} as const;


function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw Errors.INTERNAL_SERVER_ERROR(`Missing environment variable: ${name}`);
    }
    return value;
}

function number(name: string, defaultValue?: number): number {
    const value = process.env[name];
    if (!value) {
        if (defaultValue === undefined) {
            throw Errors.INTERNAL_SERVER_ERROR(`Missing environment variable: ${name}`);
        }
        return defaultValue;
    }

    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
        throw Errors.INTERNAL_SERVER_ERROR(`Environment variable ${name} must be a number`);
    }

    return parsed;
}

function list(name: string, defaultValue: string[] = []): string[] {
    const value = process.env[name];
    if (!value) return defaultValue;
    return value.split(",").map(v => v.trim());
}
