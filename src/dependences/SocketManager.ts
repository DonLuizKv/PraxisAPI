import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Server as HTTPServer } from 'http';
import { Server, Socket } from "socket.io";
import { ActiveUsers } from "../types/SocketManagerTypes";

dotenv.config();

export class SocketManager {
    private static instance: SocketManager;

    protected io: Server;

    private Users = new Map<string, Socket>();
    private Admins = new Map<string, any>();
    private Students = new Map<string, any>();

    constructor(server: HTTPServer) {
        this.io = new Server(server, {
            // solo WebSockets, nada de long polling
            // transports: ["websocket"],

            cors: {
                origin: process.env.ORIGINS,
                methods: ["GET", "POST"],
            },

            // tamaño máximo de mensaje (sube si mandas blobs/pdfs/etc.)
            // maxHttpBufferSize: 1e6, // 1 MB por defectoF
        });
    }

    //? ===== PUBLIC METHODS ===== *//
    public static getInstance(io: HTTPServer) {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager(io);
        }
        return SocketManager.instance;
    }

    //? ===== PROTECTED METHODS ===== *//
    protected getActiveUsers(): ActiveUsers[] {
        return Array.from(this.Users.entries()).map(([userUID, socketUID]) => ({ userUID, socketUID }))
    }

    //? ===== PRIVATE METHODS ===== *//
    private logConnectionStatus() {
        console.log("\x1b[33m%s\x1b[0m", "Total de usuarios conectados:", this.Users.size);
        console.log("\x1b[33m%s\x1b[0m", "Total de administradores conectados:", this.Admins.size);
        console.log("\x1b[33m%s\x1b[0m", "Total de estudiantes conectados:", this.Students.size);

        const PlayersRegistered = [...this.Admins.values(), ...this.Students.values()].map((player) => {
            const { socket, ...rest } = player;
            return {
                socketId: socket.id,
                ...rest
            };
        });

        console.log("\x1b[33m%s\x1b[0m", "Usuarios conectados:", PlayersRegistered);
    }

    //? ===== START METHOD ===== *//
    initialize() {
        try {
            console.log("\x1b[33m%s\x1b[0m", "SocketManager iniciado");
            this.io.on("connection", (socket) => {
                console.log("\x1b[32m%s\x1b[0m", "Nueva conexión de socket:", socket.id);
                if (!this.Users.has(socket.id)) {
                    this.Users.set(socket.id, socket);
                }

                console.log(this.Users.entries());


                socket.on("client_connected", (data) => {
                    const { token } = data;

                    if (!token) {
                        return;
                    }

                    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
                    if (!decoded) {
                        return;
                    }

                    const { iat, exp, ...rest } = decoded;

                    const payload = {
                        socket,
                        ...rest
                    }

                    if (decoded.role === "admin") {
                        if (!this.Admins.has(socket.id)) {
                            this.Admins.set(socket.id, payload);
                        }
                    }

                    if (decoded.role === "student") {
                        if (!this.Students.has(socket.id)) {
                            this.Students.set(socket.id, payload);
                        }
                    }

                    console.log("\x1b[31m%s\x1b[0m", "Client decoded", rest);
                    this.logConnectionStatus();
                });

                socket.on("update_data", (data) => {
                    this.Users.forEach((user) => {
                        user.emit("update_data", data);
                    });
                });

                socket.on("disconnect", () => {
                    console.log("\x1b[31m%s\x1b[0m", "Socket desconectado:", socket.id);
                    this.Users.delete(socket.id);
                    this.Admins.delete(socket.id);
                    this.Students.delete(socket.id);
                    this.logConnectionStatus();
                });

                this.logConnectionStatus();
            });
        } catch (error: any) {
            console.error("Error en SocketManager:", error.message);
        }
    }
}
