// export const normalizeStudent = async (student: Student) => {

//     const [documents, binnacles, scenary] = await Promise.all([
//         GetAllDocuments(),
//         GetAllBinnacles(),
//         ScenaryRepo.Find(student.email),
//     ]);

//     // const listDocuments = documents.filter(
//     //     (document: Document) => document.student_id === student.uid
//     // );

//     // const listBinnacles = binnacles.filter(
//     //     (binnacle: Binnacle) => binnacle.student_id === student.uid
//     // );

//     return {
//         uid: student.uid,
//         username: student.username,
//         identification: student.identification,
//         email: student.email,
//         state: Boolean(student.state),
//         profile_photo: student.avatar || "/",
//         scenary: scenary?.student_id === student.uid,
//         documents: {
//             arl: [],
//             coverLetter: [],
//             cv: [],
//         },
//         binnacles: [],
//     };
// };

export const ErrorResponse = (error: unknown, clauses: string | string[], message: string) => {
    const err = error as Error;
    const errorMessage = err?.message || "Unknown error";
    const clauseList = Array.isArray(clauses) ? clauses : [clauses];
    const statusCode = clauseList.some(clause => errorMessage.includes(clause)) ? 400 : 500;
    return {
        statusCode,
        body: {
            message,
            error: errorMessage,
        },
    };
};



export default function validateEnvironmentVariables(variables: string[]): void {
    const missing = variables.filter((env) => !process.env[env]);

    if (missing.length > 0) {
        console.error(`Missing required environment variables: ${missing.join(", ")}`);
    }
}

export const Time = {
    second: (n: number) => n * 1000,
    minute: (n: number) => n * 60 * 1000,
    hour: (n: number) => n * 60 * 60 * 1000,
    day: (n: number) => n * 24 * 60 * 60 * 1000,
    week: (n: number) => n * 7 * 24 * 60 * 60 * 1000,
};