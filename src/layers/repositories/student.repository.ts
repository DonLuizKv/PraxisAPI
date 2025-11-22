import { Student } from "../../types/user";
import { Repository } from "./Repository";

export class StudentRepository extends Repository<Student> {

    constructor() {
        super("students")
    }

    // Methods
    async UploadDocument(document: Document){}
}