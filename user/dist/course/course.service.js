"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const CourseResponse_1 = require("../dto/response/CourseResponse");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("../entities/course.entity");
const ListCourseResponseForAdmin_1 = require("../dto/response/ListCourseResponseForAdmin");
let CourseService = class CourseService {
    courseRepository;
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async getListCourse() {
        const listCourse = await this.courseRepository.find();
        console.log(listCourse);
        if (listCourse.length === 0)
            throw new common_1.HttpException("CourseEmpty", common_1.HttpStatus.NOT_FOUND);
        return listCourse.map(course => new ListCourseResponseForAdmin_1.ListCourseResponseForAdmin(course.course_id, course.name));
    }
    async getDetailCourse(id) {
        const course = await this.courseRepository.findOneBy({ course_id: id });
        if (course) {
            return new CourseResponse_1.CourseResponse(course.name);
        }
        else {
            throw new common_1.HttpException("CourseNotExisted", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createCourse(request) {
        const findCourseName = await this.courseRepository.exists({ where: { name: request.name } });
        if (findCourseName)
            throw new common_1.HttpException("CourseAlreadyExisted", common_1.HttpStatus.BAD_REQUEST);
        else {
            const course = this.courseRepository.create({
                name: request.name,
            });
            const savedCourse = await this.courseRepository.save(course);
            const newListCourse = await this.courseRepository.find();
            return newListCourse.map(course => new CourseResponse_1.CourseResponse(course.name));
        }
    }
    async deleteCourse(id) {
        const findCourse = await this.courseRepository.existsBy({ course_id: id });
        if (!findCourse)
            throw new common_1.HttpException("CourseNotExisted", common_1.HttpStatus.NOT_FOUND);
        await this.courseRepository.delete(id);
        const newListCourse = await this.courseRepository.find();
        return newListCourse.map(course => new CourseResponse_1.CourseResponse(course.name));
    }
    async findCourse(id) {
        return await this.courseRepository.findOneBy({ course_id: id });
    }
    async getDetailCourseDemo(id) {
        const course = await this.courseRepository.findOneBy({ course_id: id });
        if (course) {
            return course;
        }
        else {
            throw new common_1.HttpException("CourseNotExisted", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.CourseEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CourseService);
//# sourceMappingURL=course.service.js.map