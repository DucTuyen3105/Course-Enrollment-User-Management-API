import { CourseResponse } from "../dto/response/CourseResponse";
import { Repository } from "typeorm";
import { CourseRequest } from "../dto/request/CourseRequest";
import { CourseEntity } from "../entities/course.entity";
import { ListCourseResponseForAdmin } from "../dto/response/ListCourseResponseForAdmin";
export declare class CourseService {
    private readonly courseRepository;
    constructor(courseRepository: Repository<CourseEntity>);
    getListCourse(): Promise<ListCourseResponseForAdmin[]>;
    getDetailCourse(id: string): Promise<CourseResponse | null>;
    createCourse(request: CourseRequest): Promise<CourseResponse[]>;
    deleteCourse(id: string): Promise<any>;
    findCourse(id: string): Promise<CourseEntity | null>;
    getDetailCourseDemo(id: string): Promise<CourseResponse | null>;
}
