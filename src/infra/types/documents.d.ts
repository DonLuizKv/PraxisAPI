export type Document = {
    id: number;
    student_id: number;
    title: string;
    file_path: string;
    public_id: string;
    file_type: string;
    file_size: number; //bytes
    created_at: Date;
}

export type Arl = Document;
export type CoverLetter = Document;
export type CV = Document;
export type Binnacle = Document;

export type Scenary = {
    id: number;
    company_name: string;
    address: string;
    city: string;
    country: string;
    mode: "remoto" | "presencial";
    created_at: Date;
}