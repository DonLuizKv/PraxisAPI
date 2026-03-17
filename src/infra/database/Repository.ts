import { Database } from "./Database";
import { Tables } from "./Tables";

export class Repository<T extends object> {
    constructor(
        private readonly table: Tables,
        private readonly dbConnection: Database,
    ) { }

    protected async Find<K extends keyof T>(key: K, value: T[K]): Promise<T | null> {
        const { rowCount, rows } = await this.dbConnection.query(
            `SELECT * FROM ${this.table} WHERE ${String(key)} = $1 LIMIT 1`,
            [value]
        );
        return rowCount ? (rows[0] as T) : null;
    }

    protected async FindAll(limit: number = 50, offset: number = 0): Promise<T[]> {
        const { rows } = await this.dbConnection.query(
            `SELECT * FROM ${this.table} LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        return rows as T[];
    }

    // K extends keyof T: K es una propiedad de T
    // T[K]: User["propiedad"] => string | number | boolean | Date | null | undefined
    // T[K]: Dame el tipo de la propiedad K ("propiedad") dentro de T (user)
    protected async Exist<K extends keyof T>(key: K, value: T[K]): Promise<boolean> {
        const { rowCount } = await this.dbConnection.query(
            `SELECT 1 FROM ${this.table} WHERE ${String(key)} = $1 LIMIT 1`,
            [value]
        );

        return (rowCount ?? 0) > 0;
    }

    protected async Create(data: Partial<T>): Promise<void> {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", "); // mapear valores a query
        const query = `INSERT INTO ${this.table} (${keys.join(", ")}) VALUES (${placeholders})`;

        await this.dbConnection.query(query, values);
    }

    protected async Update(id: number | string, data: Partial<T>): Promise<boolean> {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
        const query = `UPDATE ${this.table} SET ${setClause} WHERE id = $1`;

        const { rowCount } = await this.dbConnection.query(query, [...values, id]);

        return (rowCount ?? 0) > 0;
    }

    protected async Delete(id: number | string): Promise<boolean> {
        const { rowCount } = await this.dbConnection.query(
            `DELETE FROM ${this.table} WHERE id = $1`,
            [id]
        );

        return (rowCount ?? 0) > 0;
    }
}