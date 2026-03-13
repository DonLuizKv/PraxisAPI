import http from "http";
import { ExpressServer } from "./infra/express/express.server";
import { Database } from "./infra/database/Database";
import { WebSockets } from "./infra/websockets/webSockets.server";
import { Logger } from "./infra/lib/Logger";

interface AppConfig {
    port: number;
    origins: string[];
}

export class App {

    private expressServer: ExpressServer;
    private httpServer: http.Server;
    private database: Database;
    private sockets: WebSockets;

    constructor(private config: AppConfig) {
        this.expressServer = new ExpressServer({
            origins: this.config.origins
        });

        this.httpServer = http.createServer();

        this.database = Database.getInstance();
        this.sockets = WebSockets.getInstance(this.httpServer);
    }

    public async Init() {

        // this.expressServer.Setup();

        // this.database.initialize();
        // this.sockets.initialize();

        this.httpServer.listen(this.config.port, () => {
            Logger.info(`Server running in ${this.config.port}`);
        });
    }
}
