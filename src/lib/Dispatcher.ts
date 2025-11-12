import { Server, Socket } from "socket.io";
import { Channel, Package, Message } from "../types/SocketManagerTypes";

export class Dispatcher {

    private io: Server;
    private socket: Socket;

    constructor(io: Server, socket: Socket) {
        this.io = io;
        this.socket = socket;
    }

    private Direct(event: string, to: string, message: Message) {
        this.socket.to(to).emit(event, message);
    }

    private Broadcast(event: string, to: Channel[] | Channel, message: Message) {
        this.io.to(to).emit(event, message);
    }

    private dispatcher(direction: string, packages: Package[]) {
        packages.forEach((pkg: Package) => {
            if (pkg.type === "direct") {
                this.Direct(direction, pkg.to as string, pkg.message);
            } else {
                this.Broadcast(direction, pkg.to as Channel[], pkg.message);
            }
        });
    }

    // this.socket.on("ROOM", (data: Package[]) => { });
    //     this.socket.on("ROOM:ACTION", () => { });
    //     this.socket.on("ROOM:ENTITY:ACTION", () => { });

    //     // Example
    //     this.socket.on("chat:message:send", () => { });
    //     this.socket.on("chat:user:delete", () => { });
    //     this.socket.on("binnacles:binnacles:delete_all", () => { });
    //     this.socket.on("chat", () => { }); // send package to chat room (all users)


    // ===== CHAT EVENTS ===== //
    private UserEvents() {
        this.socket.on("users:login", (data: Package[]) => 
            {
                // this.dispatcher("users:create", data)
                console.log(data);
            }
        );
    }

    setEvents() {
        this.UserEvents
    }
}