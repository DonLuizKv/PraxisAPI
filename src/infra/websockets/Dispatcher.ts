import { Server, Socket } from "socket.io";
import { Channel, Package, Message } from "../types/websockets";

/**
 * 
 * {
 *  type: "direct" | "broadcast";
 *  to: "user-123" | ["user-123", "user-456", "admins"];
 *  message: {
 *      type: string;
 *      data: any;
 *   };
 * }
 */
export class Dispatcher {
    constructor(
        private io: Server,
        private socket: Socket,
        private ActiveUsers: Map<string, Socket>
    ) { }

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

    //     this.socket.on("ROOM", (data: Package[]) => { });
    //     this.socket.on("ROOM:ACTION", () => { });
    //     this.socket.on("ROOM:ENTITY:ACTION", () => { });

    //     // Example
    //     this.socket.on("chat:message:send", () => { });
    //     this.socket.on("chat:user:delete", () => { });
    //     this.socket.on("binnacles:binnacles:delete_all", () => { });
    //     this.socket.on("chat", () => { }); // send package to chat room (all users)

    private UserEvents() {
        this.socket.on("user:login", (data: { message: string }) => {
            console.log(data);
            // this.socket.emit("user:login:success", data);
        });
    }

    init() {
        this.UserEvents();
    }
}