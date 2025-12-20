import { Repository } from "./Repository";

type Teacher = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export class TeacherRepository extends Repository<Teacher> {
    constructor () {
        super("teachers");
    }
}