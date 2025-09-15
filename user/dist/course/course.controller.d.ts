import { CourseService } from "./course.service";
import { CourseResponse } from "../dto/response/CourseResponse";
import { CourseRequest } from "../dto/request/CourseRequest";
import { GlobalResponseType } from "../GlobalResponse/global.response.type";
import { GlobalResponseData } from "../GlobalResponse/global.response.data";
import { ListCourseResponseForAdmin } from "../dto/response/ListCourseResponseForAdmin";
export declare class CourseController {
    private courseService;
    constructor(courseService: CourseService);
    getListCourse(): Promise<GlobalResponseType<ListCourseResponseForAdmin[]>>;
    getDetailCourse(id: string): Promise<GlobalResponseType<CourseResponse>>;
    createCourse(request: CourseRequest): Promise<GlobalResponseData<CourseResponse>>;
    deleteCourse(id: string): Promise<GlobalResponseData<CourseResponse>>;
}
