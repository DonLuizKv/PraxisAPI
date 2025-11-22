import { Database } from "../../dependences/Database";
import { Binnacle, Document } from "../../types/documents";

export class FilesRepository {
    constructor(
        private readonly connection:Database = Database.getInstance()
    ) {}

    async CreateDocument(document: Document) {
        const query = "INSERT INTO documents (name, student_id, document_type, file_path) VALUES (?, ?, ?, ?)";
        await this.connection.query(query, [
            document.name,
            document.student_id,
            document.file_path
        ]);
    }

    async GetAllDocuments() {
        const query = "SELECT * FROM documents";
        const { rows } = await this.connection.query(query);
        return rows;
    }

    async GetDocument(id: number) {
        const query = "SELECT * FROM documents WHERE id = ?";
        const { rows } = await this.connection.query(query, [id]);
        return rows[0];
    }

    async UpdateDocument(id: number, document: Document) {
        const fields = Object.keys(document).map(key => `${key} = ?`).join(", ");
        const values = Object.values(document);

        const query = `UPDATE documents SET ${fields} WHERE id = ?`;
        await this.connection.query(query, [...values, id]);
    }

    async DeleteDocument(id: number) {
        const query = "DELETE FROM documents WHERE id = ?";
        const { rowCount } = await this.connection.query(query, [id]);
        return (rowCount ?? 0) > 0;
    }

    async CreateBinnacle(binnacle: Binnacle) {
        const query = "INSERT INTO binnacles (name, student_id, file_path) VALUES (?, ?, ?)";
        await this.connection.query(query, [
            binnacle.name,
            binnacle.student_id,
            binnacle.file_path
        ]);
    }
}