import { Repository } from "../../infra/database/Repository";
import { Database } from "../../infra/database/Database";

export class UsersRepository extends Repository<unknown> {
    constructor(private db: Database) {
        super("", db);
    }
}
