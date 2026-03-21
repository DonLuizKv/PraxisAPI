import { Repository } from "../../infra/database/Repository";
import { Database } from "../../infra/database/Database";
import { User } from "../../infra/types/user";

export class UsersRepository extends Repository<User> {
    constructor(private db: Database) {
        super("users", db);
    }

    async CreateUser(user: Omit<User, "id">): Promise<void> {
        await this.Create(user);
    }

    async FindByEmail(email: string): Promise<User | null> {
        return this.Find("email", email);
    }

    async FindById(id: number): Promise<User | null> {
        return this.Find("id", id);
    }

    async FindByIdentification(identification: number): Promise<User | null> {
        return this.Find("id", identification);
    }

    async UpdateUser(id: number, user: Partial<User>): Promise<void> {
        await this.Update(id, user);
    }

    async DeleteUser(id: number): Promise<void> {
        await this.Delete(id);
    }

    async FindAll(): Promise<User[]> {
        return this.FindAll();
    }

}
