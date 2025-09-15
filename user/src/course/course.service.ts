import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CourseResponse} from "../dto/response/CourseResponse";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CourseRequest} from "../dto/request/CourseRequest";
import {CourseEntity} from "../entities/course.entity";
import {ListCourseResponseForAdmin} from "../dto/response/ListCourseResponseForAdmin";

@Injectable()
export class CourseService {
    constructor(@InjectRepository(CourseEntity) private readonly courseRepository : Repository<CourseEntity>) {
    }
    async getListCourse(): Promise<ListCourseResponseForAdmin[]> {
        const listCourse = await this.courseRepository.find();
        console.log(listCourse);
        if(listCourse.length === 0) throw new HttpException("CourseEmpty",HttpStatus.NOT_FOUND)
        return listCourse.map(course => new ListCourseResponseForAdmin(course.course_id,course.name))
    }
    async getDetailCourse(id : string): Promise<CourseResponse | null>
    {
        const course = await this.courseRepository.findOneBy({course_id: id});
        if(course)
        {
            return new CourseResponse(course.name)
        }
        else
        {
            throw new HttpException("CourseNotExisted",HttpStatus.BAD_REQUEST)
        }
    }
    async createCourse(request : CourseRequest): Promise<CourseResponse[]>
    {
        const findCourseName = await this.courseRepository.exists({where : { name: request.name }});
        if(findCourseName) throw new HttpException("CourseAlreadyExisted",HttpStatus.BAD_REQUEST)
        else {
            const course = this.courseRepository.create({
                name: request.name,
            })
            const savedCourse = await this.courseRepository.save(course);
            const newListCourse = await this.courseRepository.find()
            return newListCourse.map(course => new CourseResponse(course.name))
        }
    }
    async deleteCourse(id: string): Promise<any> {
        const findCourse = await this.courseRepository.existsBy({course_id: id});
        if(!findCourse) throw new HttpException("CourseNotExisted",HttpStatus.NOT_FOUND)
        await this.courseRepository.delete(id);
        const newListCourse = await this.courseRepository.find();
        return newListCourse.map(course => new CourseResponse(course.name))
    }
    // for UserService
    async findCourse(id : string) : Promise<CourseEntity | null>
    {
        return await this.courseRepository.findOneBy({course_id: id})
    }
    // for UserService
    async getDetailCourseDemo(id : string): Promise<CourseResponse | null>
    {
        const course = await this.courseRepository.findOneBy({course_id: id});
        if(course)
        {
            return course
        }
        else
        {
            throw new HttpException("CourseNotExisted",HttpStatus.BAD_REQUEST)
        }
    }
}
