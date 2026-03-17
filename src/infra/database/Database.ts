import { Pool, QueryResult } from "pg";
import { Logger } from "../lib/Logger";
import { Errors } from "../lib/ErrorManager";

export class Database {
    private static instance: Database;
    private pool: Pool;

    private constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            max: 20,
            idleTimeoutMillis: 30000,
            // connectionTimeoutMillis: 2000,
        });

        // this.setupPoolEvents();
    }

    public static getInstance(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    public async query(sql: string, params: any[] | any = []): Promise<QueryResult> {
        try {
            if (!sql || typeof sql !== "string") {
                throw Errors.BAD_REQUEST("SQL query is required and must be a string");
            }

            const { command, rowCount, oid, rows, fields } = await this.pool.query(sql, params)

            return {
                command,
                rowCount,
                oid,
                rows,
                fields,
            }

        } catch (error) {
            throw Errors.INTERNAL_SERVER_ERROR("Error executing query");
        }
    }

    // async transaction(queries: { sql: string; params?: any[] }[]): Promise<any[]> {
    //     const client = await this.pool.connect();
    //     try {
    //         await client.query("BEGIN");
    //         const results = [];

    //         for (const { sql, params = [] } of queries) {
    //             const result = await client.query(sql, params);
    //             results.push(result.rows);
    //         }

    //         await client.query("COMMIT");
    //         return results;
    //     } catch (error) {
    //         await client.query("ROLLBACK");
    //         Logger.error(error as Error);
    //         throw error;
    //     } finally {
    //         client.release();
    //     }
    // }

    public async close(): Promise<void> {
        try {
            await this.pool.end();
            Logger.db("Database connections closed");
        } catch (error) {
            throw Errors.INTERNAL_SERVER_ERROR("Error closing database connections");
        }
    }

    public getPoolStats() {
        return {
            totalCount: this.pool.totalCount,
            idleCount: this.pool.idleCount,
            waitingCount: this.pool.waitingCount,
        };
    }

    // private setupPoolEvents(): void {
    //     this.pool.on("error", (err) => Logger.error(err));
    //     this.pool.on("connect", () => Logger.database("New client connected to pool"));
    // }

    async initialize(): Promise<void> {
        try {
            const client = await this.pool.connect();
            Logger.db(`Connected to the ${process.env.DB_NAME} database`);
            client.release();
        } catch (error) {
            throw Errors.INTERNAL_SERVER_ERROR("Error connecting to database");
        }
    }

}
