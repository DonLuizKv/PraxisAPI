import { Database } from "../../dependences/Database";
import { Student, User } from "../../utilities/Types";

const connection = Database.getInstance()

export const GetAdmin = async (email: string) => {
    const query = "SELECT * FROM admins WHERE email = $1";
    const { rows } = await connection.query(query, [email]);
    return rows[0];
}

export const GetStudent = async (email: string) => {
    const query = "SELECT * FROM students WHERE email = $1";
    const { rows } = await connection.query(query, [email]);
    return rows[0];
}

export const GenerateStudent = async (student: Student) => {
    const query = `
    INSERT INTO students (name, email, password, identity_document, profile_photo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

    const values = [
        student.name,
        student.email,
        student.password,
        student.identity_document,
        student.profile_photo || '',
    ];

    const { rows } = await connection.query(query, values);
    return rows[0]; // Retorna el estudiante creado
};


export const GenerateAdmin = async (admin: User) => {
    const query = `
    INSERT INTO admins (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

    const values = [
        admin.name,
        admin.email,
        admin.password,
        admin.role || 'admin',
    ];

    const { rows } = await connection.query(query, values);
    return rows[0]; // Retorna el admin creado
};

