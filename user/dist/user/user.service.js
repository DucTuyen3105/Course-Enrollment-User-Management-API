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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const UserResponse_1 = require("../dto/response/UserResponse");
const UserValidateResponse_1 = require("../dto/response/UserValidateResponse");
const user_entity_1 = require("../entities/user.entity");
const role_enum_1 = require("../enum/role.enum");
const course_service_1 = require("../course/course.service");
const ListUserResponseForAdmin_1 = require("../dto/response/ListUserResponseForAdmin");
let UserService = class UserService {
    userRepository;
    courseService;
    constructor(userRepository, courseService) {
        this.userRepository = userRepository;
        this.courseService = courseService;
    }
    async getListUser() {
        const listUser = await this.userRepository.find({
            relations: ["courses"],
        });
        if (listUser.length === 0)
            throw new common_1.HttpException("UserEmpty", common_1.HttpStatus.NOT_FOUND);
        else if (listUser[0].name === "admin")
            throw new common_1.HttpException("OnyExistAdmin", common_1.HttpStatus.NOT_FOUND);
        return listUser.map(user => new ListUserResponseForAdmin_1.ListUserResponseForAdmin(user.id, user.name, user.email, user.roles, user.courses?.map(course => course.name) || []));
    }
    async createUser(request) {
        const findUserName = await this.userRepository.exists({ where: { name: request.name } });
        if (findUserName)
            throw new common_1.HttpException("UserAlreadyExisted", common_1.HttpStatus.BAD_REQUEST);
        else {
            const user = this.userRepository.create({
                name: request.name,
                email: request.email,
                password: request.password,
                roles: role_enum_1.Role.User
            });
            await this.userRepository.save(user);
            return new UserResponse_1.UserResponse(user.name, user.email, user.roles, user.courses?.map(course => course.name) || []);
        }
    }
    async getDetail(id) {
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: ["courses"],
        });
        if (user) {
            return new UserResponse_1.UserResponse(user.name, user.email, user.roles, user.courses?.map(course => course.name) || []);
        }
        else {
            throw new common_1.HttpException("UserNotExisted", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateUser(userId, request) {
        const findUser = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["courses"],
        });
        if (!findUser)
            throw new common_1.HttpException("UserNotFound", common_1.HttpStatus.NOT_FOUND);
        if (findUser?.roles === role_enum_1.Role.Admin) {
            await this.userRepository.update(userId, request);
            const listUser = await this.userRepository.find({
                relations: ["courses"],
            });
            return listUser.map(user => new UserResponse_1.UserResponse(user.name, user.email, user.roles, user.courses?.map(course => course.name) || []));
        }
        else if (findUser?.roles === role_enum_1.Role.User) {
            await this.userRepository.update(userId, request);
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ["courses"],
            });
            if (!user)
                throw new common_1.HttpException("UserNotExisted", common_1.HttpStatus.NOT_FOUND);
            return new UserResponse_1.UserResponse(user.name, user.email, user.roles, user.courses?.map(course => course.name) || []);
        }
    }
    async deleteUser(id) {
        const user = await this.userRepository.existsBy({ id: id });
        if (!user)
            throw new common_1.HttpException("UserNotFound", common_1.HttpStatus.NOT_FOUND);
        await this.userRepository.delete(id);
        const newListUser = await this.userRepository.find({
            relations: ["courses"],
        });
        return newListUser.map(user => new UserResponse_1.UserResponse(user.name, user.email, user.roles, user.courses?.map(course => course.name) || []));
    }
    async validateUser(request) {
        const user = await this.userRepository.findOneBy({ name: request.name });
        if (user !== null && user.password === request.password) {
            return new UserValidateResponse_1.UserValidateResponse(user.id, user.name, user.roles);
        }
        else
            throw new common_1.HttpException("WrongUserNameOrWrongPassword", common_1.HttpStatus.NOT_FOUND);
    }
    async initAdmin() {
        const admin = await this.userRepository.findOneBy({ name: 'admin' });
        if (!admin) {
            await this.userRepository.save({
                name: 'admin',
                password: 'admin',
                roles: role_enum_1.Role.Admin,
            });
        }
    }
    async registerCourse(request) {
        const user = await this.userRepository.findOne({
            where: { id: request.user_id },
            relations: ["courses"],
        });
        if (!user)
            throw new common_1.HttpException("UserNotFound", common_1.HttpStatus.NOT_FOUND);
        const course = await this.courseService.findCourse(request.course_id);
        if (!course)
            throw new common_1.HttpException("CourseNotFound", common_1.HttpStatus.NOT_FOUND);
        const alreadyRegisteredCourse = user.courses.some(c => c.course_id === request.course_id);
        if (alreadyRegisteredCourse) {
            throw new common_1.HttpException("CourseNotExisted", common_1.HttpStatus.NOT_FOUND);
        }
        if (user.courses.length > 0) {
            throw new common_1.HttpException("OnlyRegisterOneCourse", common_1.HttpStatus.BAD_REQUEST);
        }
        user.courses.push(course);
        const savedUser = await this.userRepository.save(user);
        return new UserResponse_1.UserResponse(savedUser.name, savedUser.email, savedUser.roles, savedUser.courses?.map(course => course.name) || []);
    }
    async unregisterCourse(user_id, course_id) {
        const user = await this.userRepository.findOne({
            where: { id: user_id },
            relations: ["courses"],
        });
        const course = await this.courseService.getDetailCourseDemo(course_id);
        if (!user || !course)
            throw new common_1.HttpException("User or Course not found", common_1.HttpStatus.NOT_FOUND);
        const userCourse = user.courses;
        const courseName = course.name;
        user.courses = userCourse.filter(c => c.name !== courseName);
        const savedUser = await this.userRepository.save(user);
        return new UserResponse_1.UserResponse(savedUser.name, savedUser.email, savedUser.roles, savedUser.courses?.map(course => course.name) || []);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        course_service_1.CourseService])
], UserService);
//# sourceMappingURL=user.service.js.map