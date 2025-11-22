import { Request, Response } from "express";
import { ErrorResponse } from "../../utilities/utils";
import { StudentService } from "../services/student.service";

const service = new StudentService();

export const CreateStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        await service.createStudent(req.body);
        return res.status(201).json({ message: "Student created successfully" });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "already exists", "Error to create student");
        return res.status(statusCode).json(body);
    }
};

export const GetStudents = async (req: Request, res: Response): Promise<any> => {
    try {
        const students = await service.getStudents();
        return res.status(200).json(students);
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "Error to get students", "Error to get students");
        return res.status(statusCode).json(body);
    }
};

export const GetStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        const student = await service.getStudent(req.params.id, "uid");
        return res.status(200).json({ student });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to get student");
        return res.status(statusCode).json(body);
    }
};

export const DeleteStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        await service.deleteStudent(req.params.id);
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to delete student");
        return res.status(statusCode).json(body);
    }
};

export const UpdateStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        await service.updateStudent(req.params.id, req.body);
        return res.status(200).json({ message: "Student updated successfully" });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, ["not found", "already exists", "at least one field must be updated"], "Error to update student");
        return res.status(statusCode).json(body);
    }
};


