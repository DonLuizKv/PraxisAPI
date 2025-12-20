import { Request, Response } from "express";
import { StudentService } from "../services/student.service";

const service = new StudentService();

export const CreateStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        await service.createStudent(req.body);
        return res.status(201).json({ message: "Student created successfully" });
    } catch (error: any) {
        return res.status(error.statusCode).json(error.body);
    }
};

export const GetStudents = async (req: Request, res: Response): Promise<any> => {
    try {
        const students = await service.getStudents();
        return res.status(200).json(students);
    } catch (error: any) {
            return res.status(error.statusCode).json(error.body);
    }
};

export const GetStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        const student = await service.getStudent(req.params.id, "uid");
        return res.status(200).json({ student });
    } catch (error: any) {
        return res.status(error.statusCode).json(error.body);
    }
};

export const DeleteStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        await service.deleteStudent(req.params.id);
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error: any) {
        return res.status(error.statusCode).json(error.body);
    }
};

export const UpdateStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        await service.updateStudent(req.params.id, req.body);
        return res.status(200).json({ message: "Student updated successfully" });
    } catch (error: any) {
        return res.status(error.statusCode).json(error.body);
    }
};


