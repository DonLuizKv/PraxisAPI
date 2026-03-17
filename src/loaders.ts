import http from "http";
import { Database } from "./infra/database/Database";
import { ExpressServer } from "./infra/express/express.server";
import { WebSockets } from "./infra/websockets/webSockets.server";

export async function loadDatabase() {
    const database = Database.getInstance();
    await database.initialize();
    return database;
}

export async function loadExpress(database: Database, origins: string[]) {
    const express = new ExpressServer({
        origins: origins,
        db: database
    });
    express.setup();
    return express;
}

export async function loadHttpServer(express: ExpressServer) {
    const httpServer = http.createServer(express.getApp());
    return httpServer;
}

export async function loadWebSockets(httpServer: http.Server) {
    const webSockets = WebSockets.getInstance(httpServer);
    webSockets.initialize();
    return webSockets;
}

