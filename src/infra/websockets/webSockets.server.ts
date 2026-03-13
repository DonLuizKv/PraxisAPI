import { Server as HTTPServer } from 'http';
import { Server, Socket } from "socket.io";
import { ActiveUsers } from "../types/websockets";
import { Dispatcher } from "./Dispatcher";
import { Logger } from "../lib/Logger";

export class WebSockets {
    private static instance: WebSockets;
    protected io: Server;
    private ActiveUsers = new Map<string, Socket>();

    private constructor(server: HTTPServer) {
        this.io = new Server(server, {
            // solo WebSockets, nada de long polling
            // transports: ["websocket"],

            // tamaño máximo de mensaje (sube si mandas blobs/pdfs/etc.)
            // maxHttpBufferSize: 1e6, // 1 MB por defectoF

            cors: {
                origin: process.env.ALLOWED_ORIGINS?.split(',') ?? [],
                methods: ["GET", "POST"],
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
        Logger.socket("WebSocket Server is running", { prefix: "\n" });

        this.io.on('connection', (socket: Socket) => {
            Logger.socket(`Client connected: ${socket.id}`);
            this.ActiveUsers.set(socket.id, socket);

            const events = new Dispatcher(this.io, socket, this.ActiveUsers);
            events.init();

            socket.on('disconnect', () => {
                this.ActiveUsers.delete(socket.id);
                Logger.socket(`User disconnected: ${socket.id}`);
            });

            socket.on("error", (data: Error) => {
                console.log(data);
                socket.emit("error", data);
            });
        });
    }
}
