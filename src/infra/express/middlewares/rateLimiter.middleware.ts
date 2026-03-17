import rateLimit from "express-rate-limit";
import { Time } from "../../../utilities/utils";

export const GlobalLimiter = rateLimit({
    windowMs: Time.minute(10), // min de tiempo para hacer peticiones
    max: 10, // numero de peticiones para hacer en ese tiempo de arriba
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.path === "/auth/verify",
});

export const AuthLimiter = rateLimit({
    windowMs: Time.minute(10),
    max: 10,
    message: { error: "Too many authentications, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.path === "/auth/verify",
});