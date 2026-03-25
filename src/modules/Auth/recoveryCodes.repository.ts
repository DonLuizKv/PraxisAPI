import { Database } from "../../infra/database/Database";
import { Repository } from "../../infra/database/Repository";
import { TableNames } from "../../infra/database/Tables";
import { User } from "../../infra/types/user";

interface RecoveryCodesEntity {
    id: number,
    userID: User["id"],
    code_hash: string,
    used_at: Date,
    created_at: Date,
    expires_at: Date
}

export class RecoveryCodesRepository extends Repository<RecoveryCodesEntity> {
    constructor(private db: Database) {
        super(TableNames.RecoveryCodes, db);
    }

    async SaveCode(code_hash: string, userID: number, expires_at: Date): Promise<void> {
        await this.Create({ code_hash, userID, expires_at });
    }

    async FindCodeByUserID(userID: number): Promise<RecoveryCodesEntity | null> {
        return this.Find("userID", userID);
    }

    async FindCodeByCode(code: string): Promise<RecoveryCodesEntity | null> {
        return this.Find("code_hash", code);
    }

    async DeleteCode(userID: number): Promise<void> {
        await this.Delete(userID);
    }
};