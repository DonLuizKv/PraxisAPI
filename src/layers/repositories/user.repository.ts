import { Repository } from "./Repository";
import { User } from "../../types/user";

export class UserRepository extends Repository<User> {
    constructor() {
        super("users");
    }
}