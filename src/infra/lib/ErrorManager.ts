export const Errors = {
    CORS_ERROR: (msg: string = "Not allowed by CORS") => new ErrorManager(msg, 403, false),
    NOT_FOUND: (msg: string = "Not Found") => new ErrorManager(msg, 404),
    UNAUTHORIZED: (msg: string = "Unauthorized") => new ErrorManager(msg, 401),
    FORBIDDEN: (msg: string = "Forbidden") => new ErrorManager(msg, 403),
    BAD_REQUEST: (msg: string = "Bad Request") => new ErrorManager(msg, 400),
    INTERNAL_SERVER_ERROR: (msg: string = "Internal Server Error") => new ErrorManager(msg, 500, false),
} as const;

export class ErrorManager extends Error {

    constructor(
        public message: string,
        public statusCode: number,
        public isOperational: boolean = true
    ) {
        super(message);

        Error.captureStackTrace(this, this.constructor);
    }
}