// course.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import {UserEntity} from "./user.entity";

@Entity('courses')
export class CourseEntity {
    @PrimaryGeneratedColumn("uuid")
    course_id: string;

    @Column()
    name: string;

    @ManyToMany(() => UserEntity, (user) => user.courses)
    users: UserEntity[];
    constructor(name : string)
    {
        this.name = name
    }
}
