import { CourseEntity } from "./course.entity";
export declare class UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    courses: CourseEntity[];
    constructor(name: string, email: string, password: string, role: string);
    roles: string;
}
