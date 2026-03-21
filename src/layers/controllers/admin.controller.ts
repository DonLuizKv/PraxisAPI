import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

const service = new AdminService();

export const CreateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        await service.createAdmin(req.body);
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

export const GetAdmins = async (req: Request, res: Response): Promise<void> => {
    try {
        const consult = await service.getAdmins();
        res.status(200).json({ admins: consult });
    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

export const GetAdminById = async (req: Request, res: Response): Promise<void> => {
    try {
        const consult = await service.getAdmin(req.params.id, "uid");
        res.status(200).json({ admin: consult });
    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

export const UpdateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        await service.updateAdmin(req.params.id, req.body);
        res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

export const DeleteAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        await service.deleteAdmin(req.params.id);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

