import { Student } from "../../types/user";
import { Hash } from "../../utilities/password";
import { StudentRepository } from "../repositories/student.repository";

export class StudentService {
    constructor(
        private studentRepository: StudentRepository = new StudentRepository()
    ) { }

    async createStudent(student: Student): Promise<void> {
        const password = await Hash(student.password);

        const newStudent = {
            ...student,
            password,
            avatar: student.avatar || ""
        }

        const response = await this.studentRepository.Create(newStudent);
        return response;
    }

    async getStudent(value: string, typeSearch: "email" | "uid"): Promise<any> {

        const student = await this.studentRepository.FindAllStudents();

        if (!student) {
            return null;
        }

        return student;
    }

    async getStudents(): Promise<Student[] | null> {
        const students = await this.studentRepository.FindAll();

        if (students.length === 0) {
            return null;
        }

        return students;
    }

    async deleteStudent(id: string): Promise<{ error?: string, deleted?: boolean }> {
        const student = await this.studentRepository.Find(id, "uid");

        if (!student) {
            return { error: "Student not found", deleted: false };
        }

        const result = await this.studentRepository.Delete(id);
        return { deleted: result };
    }

    async updateStudent(id: string, updatedStudent: Student): Promise<{ error?: string, updated?: boolean }> {
        const student = await this.studentRepository.Find(id, "uid");

        if (!student) {
            return { error: "Student not found", updated: false };
        }

        const result = await this.studentRepository.Update(id, updatedStudent);
        return { updated: result };
    }
}