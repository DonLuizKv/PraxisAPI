export type Tables = 
    "users" | 
    "admins" | 
    "students" | 
    "documents" | 
    "scenarys" | 
    "binnacles" | 
    "cv" | 
    "uploads" | 
    "tokens" |
    "recoverycodes";

export const TableNames = {
    Users: "users",
    Admins: "admins",
    Students: "students",
    Documents: "documents",
    Scenarys: "scenarys",
    Binnacles: "binnacles",
    CV: "cv",
    Uploads: "uploads",
    Tokens: "tokens",
    RecoveryCodes: "recoverycodes"
} as const;

