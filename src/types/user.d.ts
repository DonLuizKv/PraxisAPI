import { Arl, Binnacle, CoverLetter, CV, Scenary } from "./documents";

export type User = {
    uid: string;
    username: string;
    email: string;
    password: string;
    active: boolean;
    role: "admin" | "student";
}

export type Student = User & {
    identification: number;
    avatar: string | File | null;

    scenary: Scenary;
    documents: {
        arl: Arl,
        coverLetter: CoverLetter,
        cv: CV
    };
    binnacles: Binnacle[];
};

export type Admin = User;





export { Scenary };
