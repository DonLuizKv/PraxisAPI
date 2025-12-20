import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import http from "http";
import cookieParser from "cookie-parser";
import adminRoutes from "./layers/routes/admin.routes";
import studentRoutes from "./layers/routes/student.routes";
import authRoutes from "./layers/routes/auth.routes";
import { Logger } from "./lib/Logger";
import { corsErrorHandler } from "./middlewares/cors.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { WebSockets } from "./dependences/WebSockets";
import { notFound } from "./middlewares/notFound.middleware";
import { validateEnvironmentVariables } from "./utilities/utils";

dotenv.config();
const requiredVariables: string[] = [
    "PORT",
    "ALLOWED_ORIGINS",
    "JWT_SECRET",
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_PASS",
    "DB_NAME"
];

validateEnvironmentVariables(requiredVariables);

const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [];

const app = express();
const server = http.createServer(app);

const webSocketServer = WebSockets.getInstance(server);
webSocketServer.initialize();

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(Logger.httpMiddleware());
app.use(cors(corsOptions));
app.use(corsErrorHandler);
app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Praxis")
})

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
    Logger.info(`Server running in ${PORT}`);
})
