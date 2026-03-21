import { FilesRepository } from "../repositories/files.repository";

export class FilesService {
    constructor(
        private filesRepository: FilesRepository = new FilesRepository()
    ) { }

    async uploadDocument(){}
    

    // //& POST - documents
    // async uploadDocument(document: Document) {
    
    //     const payload = {
    //         ...document,
    //         document_type: document.name as "arl" | "coverLetter"
    //     }

    //     const response = await this.filesRepository.CreateDocument(payload);
    //     return response;
    // }   

    // //& POST - binnacles
    // async uploadBinnacle(binnacle: Binnacle) {
    //     const payload = {
    //         ...binnacle,
    //         document_type: binnacle.name as "arl" | "coverLetter"
    //     }

    //     const response = await this.filesRepository.CreateBinnacle(payload);
    //     return response;
    // }   

    // //$ GET - documents
    // async getDocuments() {
    //     const errors = {
    //         notFound: "Documents not found",
    //     }

    //     const documents = await this.filesRepository.GetAllDocuments();

    //     if (documents.length === 0) {
    //         throw new Error(errors.notFound);
    //     }

    //     return documents;
    // }

    // //$ GET - binnacles
    // async getBinnacles() {
    //     const errors = {
    //         notFound: "Binnacles not found",
    //     }

    //     const binnacles = await this.filesRepository.GetAllBinnacles();

    //     if (binnacles.length === 0) {
    //         throw new Error(errors.notFound);
    //     }

    //     return binnacles;
    // }

    // //$ GET - document by id
    // async getDocumentById(id: number) {
    //     const errors = {
    //         notFound: "Document not found",
    //     }

    //     const document = await this.filesRepository.GetDocument(id);

    //     if (!document) {
    //         throw new Error(errors.notFound);
    //     }

    //     return document;
    // }

    // //$ GET - binnacle by id
    // async getBinnacleById(id: number) {
    //     const errors = {
    //         notFound: "Binnacle not found",
    //     }

    //     const binnacle = await this.filesRepository.GetBinnacle(id);

    //     if (!binnacle) {
    //         throw new Error(errors.notFound);
    //     }

    //     return binnacle;
    // }

    // //* PUT - document by id
    // async updateDocument(id: number, updatedDocument: Document) {
    //     const response = await this.filesRepository.UpdateDocument(id, updatedDocument);
    //     return response;
    // }

    // //$ GET - documents
    // async getDocuments() {
    //     const errors = {
    //         notFound: "Documents not found",
    //     }

    //     const documents = await GetAllDocuments();

    //     if (documents.length === 0) {
    //         throw new Error(errors.notFound);
    //     }

    //     return documents;
    // }

    // //$ GET - binnacles
    // async getBinnacles() {
    //     const errors = {
    //         notFound: "Binnacles not found",
    //     }

    //     const binnacles = await GetAllBinnacles();

    //     if (binnacles.length === 0) {
    //         throw new Error(errors.notFound);
    //     }

    //     return binnacles;
    // }

    // //$ GET - document by id
    // async getDocumentById(id: number) {
    //     const errors = {
    //         notFound: "Document not found",
    //     }

    //     const document = await verifyField("documents", "id", id);

    //     if (!document) {
    //         throw new Error(errors.notFound);
    //     }

    //     const documents = await GetDocument(id);
    //     return documents;
    // }

    // //$ GET - binnacle by id
    // async getBinnacleById(id: number) {
    //     const errors = {
    //         notFound: "Binnacle not found",
    //     }

    //     const binnacle = await verifyField("binnacles", "id", id);

    //     if (!binnacle) {
    //         throw new Error(errors.notFound);
    //     }

    //     const binnacles = await GetBinnacle(id);
    //     return binnacles;
    // }

    // //* PUT - document by id
    // async updateDocument(id: number, updatedDocument: Document) {
    //     const errors = {
    //         name: "This document already exists",
    //     }



    //     for (const key of Object.keys(errors)) {
    //         const values = updatedDocument[key as keyof Document];
    //         const exists = await verifyField("documents", key, values);
    //         if (exists) {
    //             throw new Error(errors[key as keyof typeof errors]);
    //         }
    //     }

    //     const response = await UpdateDocument(id, updatedDocument);
    //     return response;
    // }

    // //* PUT - binnacle by id
    // async updateBinnacle(id: number, updatedBinnacle: Binnacle) {
    //     const errors = {
    //         name: "This binnacle already exists",
    //     }

    //     const binnacle = await verifyField("binnacles", "id", id);

    //     if (!binnacle) {
    //         throw new Error("Binnacle not found");
    //     }

    //     for (const key of Object.keys(errors)) {
    //         const values = updatedBinnacle[key as keyof Binnacle];
    //         const exists = await verifyField("binnacles", key, values);
    //         if (exists) {
    //             throw new Error(errors[key as keyof typeof errors]);
    //         }
    //     }

    //     const response = await UpdateBinnacle(id, updatedBinnacle);
    //     return response;
    // }

    // //! DELETE - document by id
    // async deleteDocument(id: number) {
    //     const errors = {
    //         notFound: "Document not found",
    //     }

    //     const document = await verifyField("documents", "id", id);

    //     if (!document) {
    //         throw new Error(errors.notFound);
    //     }

    //     const response = await DeleteDocument(id);
    //     return response;
    // }

    // //! DELETE - binnacle by id
    // async deleteBinnacle(id: number) {
    //     const errors = {
    //         notFound: "Binnacle not found",
    //     }

    //     const binnacle = await verifyField("binnacles", "id", id);

    //     if (!binnacle) {
    //         throw new Error(errors.notFound);
    //     }

    //     const response = await DeleteBinnacle(id);
    //     return response;
    // }
}
