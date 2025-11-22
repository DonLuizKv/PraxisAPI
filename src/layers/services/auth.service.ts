import jwt from 'jsonwebtoken';
import { User, Student, Admin } from '../../types/user';
import { Token } from '../../types/auth';
import { StudentService } from './student.service';
import { AdminService } from './admin.service';
import { comparePassword } from '../../utilities/password';

export class AuthService {

    constructor(
        private readonly SECRET: string = process.env.JWT_SECRET as string,
        private readonly studentService: StudentService = new StudentService(),
        private readonly adminService: AdminService = new AdminService()
    ) { }

    public async login(credentials: User) {
        const { email, password } = credentials;

        const [admin, student] = await Promise.all([
            this.adminService.getAdmin(email, "email"),
            this.studentService.getStudent(email, "email")
        ]);

        const user: Admin | Student | null = admin || student;

        if (!user) {
            throw new Error("User not found");
        }

        // const isPasswordValid: boolean = await comparePassword(password, user.password);

        // if (!isPasswordValid) {
        //     throw new Error("Invalid password");
        // }

        const payload: Token = {
            sub: user.uid,
            role: user.role,
        }

        const token: string = jwt.sign(payload, this.SECRET, { expiresIn: "24h" });

        return {
            token,
            role: user.role
        };
    }

    public async register(credentials: User) {}

    public async verifySession(token: string) {

        if (!token) throw new Error("Token not provided");

        const decoded: Token = jwt.verify(token, this.SECRET) as Token;

        if (decoded.role !== "admin" && decoded.role !== "student") {
            throw new Error("Invalid role");
        }

        switch (decoded.role) {
            case "admin":
                const admin: Admin | null = await this.adminService.getAdmin(decoded.sub, "uid");
                if (!admin) throw new Error("Admin not found");
                return admin;

            case "student":
                const student: Student | null = await this.studentService.getStudent(decoded.sub, "uid");
                if (!student) throw new Error("Student not found");
                return student;

            default:
                throw new Error("Invalid role or Not found");
        }

    }

}
