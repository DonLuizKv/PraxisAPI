import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const service = new UserService();

export const CreateUser = async (req: Request, res: Response) => {
    const { username, email, password, role, state } = req.body;
    await service.createUser({ username, email, password, role, state });
    res.status(201).json({ message: "User created successfully" });
}

export const GetUsers = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
    const users = await service.getUsers(Number(limit), Number(offset));
    res.status(200).json(users);
}

export const GetUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await service.getUser(id, "uid");
    res.status(200).json(user);
}

export const UpdateUser = async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { username, email, password, role, state } = req.body;
    await service.updateUser(uid, { username, email, password, role, state });
    res.status(200).json({ message: "User updated successfully" });
}

export const DeleteUser = async (req: Request, res: Response) => {
    const { uid } = req.params;
    await service.deleteUser(uid);
    res.status(200).json({ message: "User deleted successfully" });
}

export const ChangeRole = async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { role } = req.body;
    await service.changeUserRole(uid, role);
    res.status(200).json({ message: "User role changed successfully" });
}

export const ChangeStateUser = async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { state } = req.body;
    await service.changeUserState(uid, state);
    res.status(200).json({ message: "User state changed successfully" });
}
