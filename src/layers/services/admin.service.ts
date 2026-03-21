import { Admin } from "../../types/user";
import { AdminRepository } from "../repositories/admin.repository";

export class AdminService {

    constructor(
        private adminRepository: AdminRepository = new AdminRepository()
    ) { }

    // POST
    async createAdmin(admin: Admin): Promise<void> {
        await this.adminRepository.Create(admin);
    }

    //$ GET
    async getAdmins(): Promise<Admin[] | null> {
        return this.adminRepository.FindAll() || null;
    }

    //$ GET by email or uid
    async getAdmin(value: string, typeSearch: "email" | "uid"): Promise<Admin | null> {
        return this.adminRepository.Find(value, typeSearch) || null;
    }

    //! DELETE
    async deleteAdmin(id: string): Promise<{ error?: string, deleted?: boolean }> {

        const admin = await this.adminRepository.Find(id, "uid");

        if (!admin) {
            return { error: "Admin not found", deleted: false };
        }

        const result = await this.adminRepository.Delete(id);
        return { deleted: result };
    }

    //# UPDATE
    async updateAdmin(id: string, updatedAdmin: Admin): Promise<{ error?: string, updated?: boolean }> {

        const admin = await this.adminRepository.Find(id, "uid");

        if (!admin) {
            return { error: "Admin not found", updated: false };
        }

        const result = await this.adminRepository.Update(id, updatedAdmin);
        return { updated: result };
    }
}




