// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import {CourseEntity} from "./course.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;
    @Column()
    password: string;
    @ManyToMany(() => CourseEntity, (course) => course.users)
    @JoinTable({
        name: "user_courses", // 👈 bảng trung gian
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "course_id",
            referencedColumnName: "course_id",
        },
    })
    courses: CourseEntity[];
    constructor(name: string, email: string, password: string,role : string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    @Column()
    roles : string
}
