import { Database } from "../../infra/database/Database";
import { Repository } from "../../infra/database/Repository";
import { TableNames } from "../../infra/database/Tables";

interface TokenEntity {
    id: number;
    sub: number; // ID del usuario
    token: string;
    expires_at: Date;
}

export class TokenRepository extends Repository<TokenEntity> {
    constructor(private db: Database) {
        super(TableNames.Tokens, db);
    }

    async CreateToken(token: string, sub: number, expires_at: Date): Promise<void> {
        await this.Create({ token, sub, expires_at });
    }

    async FindTokenByUserID(userID: number): Promise<TokenEntity | null> {
        return this.Find("sub", userID);
    }

    async FindTokenByToken(token: string): Promise<TokenEntity | null> {
        return this.Find("token", token);
    }

    async DeleteToken(userID: number): Promise<void> {
        await this.Delete(userID);
    }
}