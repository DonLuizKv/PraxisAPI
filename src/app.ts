import http from "http";
import { ExpressServer } from "./infra/express/express.server";
import { Database } from "./infra/database/Database";
import { WebSockets } from "./infra/websockets/webSockets.server";
import { Logger } from "./infra/lib/Logger";
import { loadDatabase, loadExpress, loadHttpServer, loadWebSockets } from "./loaders";

interface AppConfig {
    port: number;
    origins: string[];
}

export class App {
    private expressServer!: ExpressServer;
    private httpServer!: http.Server;
    private database!: Database;
    private sockets!: WebSockets;

    constructor(private config: AppConfig) { }

    public async load(): Promise<void> {
        this.database = await loadDatabase();
        this.expressServer = await loadExpress(this.database, this.config.origins);
        this.httpServer = await loadHttpServer(this.expressServer);
        this.sockets = await loadWebSockets(this.httpServer);
    }

    public start(): void {
        this.httpServer.listen(this.config.port, () => {
            Logger.info(`Server running on port ${this.config.port}`);
        });
    }

    // Exponer el server si hace falta (tests, etc.)
    public getHttpServer(): http.Server {
        return this.httpServer;
    }
}