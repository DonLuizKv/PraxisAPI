export interface Interval {
    seconds: string;
    minutes: string;
    hours: string;
    days: string;
    months: string;
    daysOfWeek: string;
}

export type ActiveUsers = {
    userUID: string,
    socketUID: Socket
}
export type ActiveStudents = {
    userUID: string,
    socketUID: Socket
} 
export type ActiveAdmins = {
    userUID: string,
    socketUID: Socket
}

// ===== DISPATCHER ===== //
export type Package = {
    type: "direct" | "broadcast";
    to: string | Channel[];
    message: Message;
}

export type Channel = "user" | "students" | "admins";
export type Message = Record<string, string | number | boolean> | string;

