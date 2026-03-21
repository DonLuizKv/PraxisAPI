import cookieParser from "cookie-parser";
import Express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { Logger } from "../lib/Logger";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { corsErrorHandler } from "./middlewares/cors.middleware";
import { Errors } from "../lib/ErrorManager";
import { Database } from "../database/Database";
import { AuthModule } from "../../modules/Auth/auth.module";
import { UsersModule } from "../../modules/Users/users.module";

interface ExpressServerConfig {
    origins: string[];
    db: Database;
}

export class ExpressServer {
    private app: Express.Application;

    constructor(private config: ExpressServerConfig) {
        this.app = Express();
    }

    private setupMiddlewares() {
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

    private setUpErrorMiddlewares() {
        this.app.use(corsErrorHandler);
        this.app.use(errorHandler);
    }

    private setupRoutes() {
        this.app.use("/api/v1/auth", AuthModule.create({ db: this.config.db }));
        this.app.use("/api/v1/users", UsersModule.create({ db: this.config.db }));
        this.app.use("/api/v1/students",(req, res)=>{});
        this.app.use("/api/v1/admins",(req, res)=>{});

        this.app.use("/api/v1/documents",(req, res)=>{});
        this.app.use("/api/v1/scenarys",(req, res)=>{});
        this.app.use("/api/v1/binnacles",(req, res)=>{});
        this.app.use("/api/v1/cv",(req, res)=>{});

        this.app.use("/api/v1/uploads",(req, res)=>{});

        this.app.get("/api/v1/", (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, "../../../public/index.html"));
        });
    }

    public getApp() {
        return this.app;
    }

    public async setup() {
        this.setupMiddlewares();
        this.setupRoutes();
        this.setUpErrorMiddlewares();
    }
}