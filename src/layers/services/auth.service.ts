import jwt from "jsonwebtoken";
import { Student, Admin } from '../../types/user';
import { Token } from '../../types/auth';
import { StudentService } from './student.service';
import { AdminService } from './admin.service';
import { compare } from '../../utilities/password';
import { ErrorManager } from '../../lib/ErrorManager';

export class AuthService {

    private readonly JWT_SECRET: string = process.env.JWT_SECRET as string;
    private readonly adminService: AdminService;
    private readonly studentService: StudentService;

    constructor() {
        this.adminService = new AdminService();
        this.studentService = new StudentService();
    }

    public async login(email: string, password: string) {

        const [admin, student] = await Promise.all([
            this.adminService.getAdmin(email, "email"),
            this.studentService.getStudent(email, "email")
        ]);

        const user: Admin | Student | null = admin || student;
        if (!user) {
            throw new ErrorManager("User not found", 404);
        }

        const isPasswordValid: boolean = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new ErrorManager("Invalid password", 400);
        }

        const payload: Token = {
            sub: user.uid,
            role: user.role,
        }

        const token: string = jwt.sign(payload, this.JWT_SECRET, {
            expiresIn: "24h"
        });

        return {
            token,
            role: user.role
        };
    }

    public async register(email: string, password: string) {

    }

    public async verifySession(token: string) {
        if (!token) throw new ErrorManager("Token not provided", 401);

        const decoded: Token = jwt.verify(token, this.JWT_SECRET) as Token;

        if (decoded.role !== "admin" && decoded.role !== "student") {
            throw new ErrorManager("Invalid role", 401);
        }

        const user = await Promise.all([
            this.adminService.getAdmin(decoded.sub, "uid"),
            this.studentService.getStudent(decoded.sub, "uid")
        ]);

        switch (decoded.role) {
            case "admin":
                const admin: Admin | null = user[0];
                return admin;

            case "student":
                const student: Student | null = user[1];
                return student;

            default:
                throw new ErrorManager("Invalid role or Not found", 401);
        }
    }

}
