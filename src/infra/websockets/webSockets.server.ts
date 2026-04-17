import { Server as HTTPServer } from 'http';
import { Server, Socket } from "socket.io";
import { ActiveUsers } from "../types/websockets";
import { Dispatcher } from "./Dispatcher";
import { Logger } from "../lib/Logger";
import { Env } from '../../config/Env';

export class WebSockets {
    private static instance: WebSockets;
    protected io: Server;
    private ActiveUsers = new Map<string, Socket>();
    private usersSessions: number = 0;

    private constructor(server: HTTPServer) {
        this.io = new Server(server, {
            // solo WebSockets, nada de long polling
            transports: ["websocket"],

            // tamaño máximo de mensaje (sube si mandas blobs/pdfs/etc.)
            maxHttpBufferSize: 1e6, // 1 MB por defectoF

            cors: {
                origin: Env.Global.ORIGINS,
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
    }

    public static getInstance(io: HTTPServer) {
        if (!WebSockets.instance) {
            WebSockets.instance = new WebSockets(io);
        }
        return WebSockets.instance;
    }

    public getActiveUsers(): ActiveUsers[] {
        return Array.from(this.ActiveUsers.entries()).map(([userUID, socketUID]) => ({ userUID, socketUID }))
    }

    initialize() {
        Logger.socket("WebSocket Server is running");

        this.io.on('connection', (socket: Socket) => {
            this.connectUser(socket);
            this.dispatcher(socket);

            socket.on('disconnect', () => this.disconnectUser(socket));
            socket.on("error", (data: Error) => this.errorUser(socket, data));
        });
    }

    private connectUser(socket: Socket) {
        this.ActiveUsers.set(socket.id, socket);
        this.usersSessions++;
        Logger.socket(`Users Connected: ${this.usersSessions}`);
    }

    private disconnectUser(socket: Socket) {
        this.ActiveUsers.delete(socket.id);
        this.usersSessions--;
        Logger.socket(`Users Connected: ${this.usersSessions}`);
    }

    private errorUser(socket: Socket, data: Error) {
        Logger.error(data);
        socket.emit("error", data);
    }

    private dispatcher(socket: Socket) {
        const events = new Dispatcher(this.io, socket, this.ActiveUsers);
        events.init();
    }
}
