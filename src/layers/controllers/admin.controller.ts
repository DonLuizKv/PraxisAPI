import { Request, Response } from "express";
import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from "../services/admin.service";

export const CreateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {

        await createAdmin(req.body);
        res.status(201).json({ message: 'Admin created successfully' });

    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

export const GetAdmins = async (req: Request, res: Response): Promise<void> => {
    try {
        const consult = await getAdmins();
        res.status(200).json({ admins: consult });
    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

export const GetAdminById = async (req: Request, res: Response): Promise<void> => {
    try {
        const consult = await getAdminById(Number(req.params.id));
        res.status(200).json({ admin: consult });
    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

export const UpdateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        await updateAdmin(Number(req.params.id), req.body);
        res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

export const DeleteAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteAdmin(Number(req.params.id));
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error: unknown) {
        res.status(500).json({
            details: error as Error
        });
    }
};

