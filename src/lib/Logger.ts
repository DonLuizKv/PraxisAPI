import { Request, Response, NextFunction } from "express";

export type Color = "black" | "red" | "green" | "yellow" | "blue" | "violet" | "white" | "cyan";
export type LogLevel = "info" | "warn" | "error" | "http" | "socket" | "db";
export type HttpMethods = "POST" | "PUT" | "DELETE" | "GET" | "PATCH" | "OPTIONS" | "HEAD";

export interface StyleConfig {
    color?: Color;
    bgColor?: Color;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}

export type LogPart = "general" | "tag" | "msg";
export type LogConfig = Partial<Record<LogPart, StyleConfig>>;

export interface ExtraConfigLog {
    styles?: LogConfig;
    prefix?: string;
    suffix?: string;
}

const COLORS: Record<Color, string> = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    violet: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
};

const BG_COLORS: Record<Color, string> = {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    violet: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
};

const HTTP_METHOD_COLORS: Record<HttpMethods, Color> = {
    GET: "green",
    POST: "blue",
    PUT: "violet",
    DELETE: "red",
    PATCH: "yellow",
    OPTIONS: "cyan",
    HEAD: "white"
};

const RESET = "\x1b[0m";

export class Logger {
    private static applyStyle(text: string, style?: StyleConfig, general?: StyleConfig): string {
        if (!style && !general) return text;

        const merged: StyleConfig = { ...general, ...style };
        const effects: string[] = [];

        if (merged.color) effects.push(COLORS[merged.color]);
        if (merged.bgColor) effects.push(BG_COLORS[merged.bgColor]);
        if (merged.bold) effects.push("\x1b[1m");
        if (merged.italic) effects.push("\x1b[3m");
        if (merged.underline) effects.push("\x1b[4m");

        return effects.join("") + text + RESET;
    }

    private static log(tag: LogLevel, message: string | Error, config: LogConfig = {}, prefix: string = "", suffix: string = ""): void {
        const msgText = message instanceof Error ? message.message : message;

        const tagPart = this.applyStyle(tag.toUpperCase(), config.tag, config.general);
        const msgPart = this.applyStyle(msgText, config.msg, config.general);

        console.log(`${prefix}[${tagPart}] ${msgPart}${suffix}`);

        if (message instanceof Error && message.stack) {
            const stackPart = this.applyStyle(message.stack, config.msg, config.general);
            console.log(stackPart);
        }
    }

    public static info(msg: string, extra: ExtraConfigLog = {}): void {
        this.log("info", msg, {
            general: { color: "green" },
            tag: { color: "green", bold: true },
            ...extra.styles
        }, extra.prefix, extra.suffix);
    }

    public static warn(msg: string, extra: ExtraConfigLog = {}): void {
        this.log("warn", msg, {
            general: { color: "yellow" },
            tag: { color: "yellow", bold: true },
            ...extra.styles
        }, extra.prefix, extra.suffix);
    }

    public static error(msg: string | Error, extra: ExtraConfigLog = {}): void {
        this.log("error", msg, {
            general: { color: "red" },
            tag: { color: "red", bold: true },
            ...extra.styles
        }, extra.prefix, extra.suffix);
    }

    public static http(msg: string, extra: ExtraConfigLog = {}): void {
        this.log("http", msg, {
            general: { color: "white" },
            tag: { color: "white", bold: true },
            ...extra.styles
        }, extra.prefix, extra.suffix);
    }

    public static socket(msg: string, extra: ExtraConfigLog = {}): void {
        this.log("socket", msg, {
            general: { color: "violet" },
            tag: { color: "violet", bold: true },
            ...extra.styles
        }, extra.prefix, extra.suffix);
    }

    public static db(msg: string, extra: ExtraConfigLog = {}): void {
        this.log("db", msg, {
            general: { color: "blue" },
            tag: { color: "blue", bold: true },
            ...extra.styles
        }, extra.prefix, extra.suffix);
    }

    public static httpMiddleware() {
        return (req: Request, res: Response, next: NextFunction) => {
            const start = Date.now();
            res.on("finish", () => {
                const duration = Date.now() - start;
                const method = req.method.toUpperCase() as HttpMethods;
                const color = HTTP_METHOD_COLORS[method] ?? "white";
                const styledMethod = this.applyStyle(method, { color, bold: true });

                let statusColor: Color = "green";
                if (res.statusCode >= 300) statusColor = "cyan";
                if (res.statusCode >= 400) statusColor = "yellow";
                if (res.statusCode >= 500) statusColor = "red";

                const styledStatus = this.applyStyle(res.statusCode.toString(), { color: statusColor, bold: true });

                this.http(
                    `${styledMethod} ${req.originalUrl} - ${styledStatus} (${duration}ms)`
                );
            });
            next();
        };
    }
}