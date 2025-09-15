import { UserEntity } from "./user.entity";
export declare class CourseEntity {
    course_id: string;
    name: string;
    users: UserEntity[];
    constructor(name: string);
}
