import cookieParser from "cookie-parser";
import Express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { Logger } from "../lib/Logger";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { corsErrorHandler } from "./middlewares/cors.middleware";
import { Errors } from "../lib/ErrorManager";

interface ExpressServerConfig {
    origins: string[];
}

export class ExpressServer {
    private app: Express.Application;

    constructor(private config: ExpressServerConfig) {
        this.app = Express();
    }

    private SetupMiddlewares() {
        const corsOptions = {
            origin: (
                origin: string | undefined,
                callback: (err: Error | null, allow?: boolean) => void
            ) => {
                if (!origin || this.config.origins.includes(origin)) {
                    return callback(null, true);
                }

                const message = `Origin ${origin} is not allowed by CORS`;
                Logger.warn(message);

                return callback(Errors.FORBIDDEN(message), false);
            },
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        };

        this.app.use(Express.json());
        this.app.use(Express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors(corsOptions));
    }

    private SetUpErrorMiddlewares() {
        this.app.use(corsErrorHandler);
        this.app.use(errorHandler);
    }

    private SetupRoutes() {
        this.app.use("/api/v1/auth",);
        this.app.use("/api/v1/users",);
        this.app.use("/api/v1/students",);
        this.app.use("/api/v1/admins",);

        this.app.use("/api/v1/documents",);
        this.app.use("/api/v1/scenarys",);
        this.app.use("/api/v1/binnacles",);
        this.app.use("/api/v1/cv",);

        this.app.use("/api/v1/uploads",);

        this.app.get("/api/v1/", (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, "../../../public/index.html"));
        });
    }

    public async Setup() {
        this.SetupMiddlewares();
        this.SetupRoutes();
        this.SetUpErrorMiddlewares();
    }
}