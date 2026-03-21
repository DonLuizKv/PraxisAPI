import { Request, Response } from "express";
import { TeacherService } from "../services/teacher.service";

const service = new TeacherService();

export const GetTeachers = (req: Request, res: Response) => {
    const consult = service.getTeachers();
    res.status(200).json({ teachers: consult });
}

export const GetTeacherById = (req: Request, res: Response) => {
    const consult = service.getTeacherById(req.params.id);
    res.status(200).json({ teacher: consult });
}

export const UpdateTeacher = (req: Request, res: Response) => {
    const consult = service.updateTeacher(req.params.id, req.body.name, req.body.email, req.body.password);
    res.status(200).json({ teacher: consult });
}

export const DeleteTeacher = (req: Request, res: Response) => {
    const consult = service.deleteTeacher(req.params.id);
    res.status(200).json({ teacher: consult });
}
