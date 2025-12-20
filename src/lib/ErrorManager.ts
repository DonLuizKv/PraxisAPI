export class ErrorManager extends Error {

    public statusCode: number;
    public status: string;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 500 ? 'error' : 'bad request';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}