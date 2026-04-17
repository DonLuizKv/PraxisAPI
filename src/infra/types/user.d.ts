import { Arl, Binnacle, CoverLetter, CV, Scenary } from "./documents";

export type User = {
    id: number; //solo backend
    username: string;
    email: string;
    password: string; //solo backend
    active: boolean;
    role: "admin" | "student";
}

export type Student = User & {
    identification: number;
    avatar: string | null; //cloudinary

    scenary: Scenary;
    documents: {
        arl: Arl | null;
        cover_letter: CoverLetter | null;
        cv: CV | null;
    };
    binnacles: Binnacle[];
};

export type Admin = User;
