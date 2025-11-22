type Document = {
    student_id:string;
    name: string;
    file_path: string;
    data?: File;
}

export type Arl = Document;
export type CoverLetter = Document;
export type Binnacle = Document;

export type CV = Document;

export type Scenary = {
    id: number;
    name: string;
    address: string;
    description: string;
    location?: string;
}