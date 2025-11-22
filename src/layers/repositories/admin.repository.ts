import { Admin } from "../../types/user";
import { Repository } from "./Repository";

export class AdminRepository extends Repository<Admin> {
    constructor() {
        super("admins")
    }
}