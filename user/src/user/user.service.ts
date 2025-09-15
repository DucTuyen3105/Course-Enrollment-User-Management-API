import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserResponse} from "../dto/response/UserResponse";
import {CreateUserRequest} from "../dto/request/CreateUserRequest";
import {UpdateUserRequest} from "../dto/request/UpdateUserRequest";
import {SignInRequest} from "../dto/request/SignInRequest";
import {UserValidateResponse} from "../dto/response/UserValidateResponse";
import {UserEntity} from "../entities/user.entity";
import {Role} from "../enum/role.enum";
import {RegisterCourseRequest} from "../dto/request/RegisterCourseRequest";
import {CourseService} from "../course/course.service";
import {ListUserResponseForAdmin} from "../dto/response/ListUserResponseForAdmin";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity>,
                private readonly courseService : CourseService,) {
    }
    async getListUser(): Promise<ListUserResponseForAdmin[]>
    {
        const listUser = await this.userRepository.find({
            relations: ["courses"],
        });
        if(listUser.length === 0 ) throw new HttpException("UserEmpty",HttpStatus.NOT_FOUND)
        else if(listUser[0].name === "admin")throw new HttpException("OnyExistAdmin",HttpStatus.NOT_FOUND)
        return listUser.map(
            user =>
                new ListUserResponseForAdmin(
                    user.id,
                    user.name,
                    user.email,
                    user.roles,
                    user.courses?.map(course => course.name) || []
                ),
        );
    }
    async createUser(request : CreateUserRequest): Promise<UserResponse>
    {
        const findUserName = await this.userRepository.exists({where : { name: request.name }});
        if(findUserName) throw new HttpException("UserAlreadyExisted",HttpStatus.BAD_REQUEST)
        else {
            const user = this.userRepository.create({
                name: request.name,
                email: request.email,
                password: request.password,
                roles: Role.User
            })
             await this.userRepository.save(user);
            return new UserResponse(
                user.name,
                user.email,
                user.roles,
                user.courses?.map(course => course.name) || []
            )
        }
    }
    async getDetail(id : string): Promise<UserResponse>
    {
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: ["courses"],
        });
        if(user)
        {
            return new UserResponse(user.name,user.email,user.roles,user.courses?.map(course => course.name) || [])
        }
        else
        {
            throw new HttpException("UserNotExisted",HttpStatus.NOT_FOUND)
        }
    }
    async updateUser(userId : string, request: UpdateUserRequest): Promise<any> {
        const findUser = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["courses"],
        });
        if(!findUser) throw new HttpException("UserNotFound",HttpStatus.NOT_FOUND);
        if(findUser?.roles === Role.Admin)
        {
            await this.userRepository.update(userId,request)
            const listUser = await this.userRepository.find({
            relations: ["courses"],
            })
            return listUser.map(user => new UserResponse(user.name,user.email,user.roles,user.courses?.map(course => course.name) || []))
        }
        else if(findUser?.roles === Role.User)
        {
            await this.userRepository.update(userId,request)
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ["courses"],
            });
            if(!user) throw new HttpException("UserNotExisted",HttpStatus.NOT_FOUND)
            return new UserResponse(user.name,user.email,user.roles,user.courses?.map(course => course.name) || [])
        }
    }
    async deleteUser(id: string): Promise<UserResponse[]> {
        const user = await this.userRepository.existsBy({id : id})
        if(!user) throw new HttpException("UserNotFound",HttpStatus.NOT_FOUND)
        await this.userRepository.delete(id);
        const newListUser = await this.userRepository.find({
            relations: ["courses"],
        });
        return newListUser.map(user => new UserResponse(user.name,user.email,user.roles,user.courses?.map(course => course.name) || []))
    }
    async validateUser(request: SignInRequest): Promise<Boolean | UserValidateResponse>
    {
        const user = await this.userRepository.findOneBy({ name: request.name });
        if(user !== null && user.password === request.password)
        {
            return new UserValidateResponse(user.id,user.name,user.roles)
        }
        else throw new HttpException("WrongUserNameOrWrongPassword",HttpStatus.NOT_FOUND)
    }
    async initAdmin(): Promise<any>
    {
        const admin = await this.userRepository.findOneBy({ name: 'admin' });
        if (!admin) {
            await this.userRepository.save({
                name: 'admin',
                password: 'admin',
                roles: Role.Admin,
            });
        }
    }
    async registerCourse(request : RegisterCourseRequest): Promise<UserResponse>
    {
        const user = await this.userRepository.findOne({
            where: { id: request.user_id },
            relations: ["courses"],
        });
        if (!user) throw new HttpException("UserNotFound",HttpStatus.NOT_FOUND)
        const course = await this.courseService.findCourse(request.course_id)
        if (!course) throw new HttpException("CourseNotFound",HttpStatus.NOT_FOUND)
        const alreadyRegisteredCourse = user.courses.some(
            c => c.course_id === request.course_id
        );
        if (alreadyRegisteredCourse) {
            throw new HttpException("CourseNotExisted",HttpStatus.NOT_FOUND)
        }
        if (user.courses.length > 0) {
            throw new HttpException("OnlyRegisterOneCourse",HttpStatus.BAD_REQUEST)
        }
        user.courses.push(course)
        const savedUser =  await this.userRepository.save(user);
        return new UserResponse(savedUser.name,savedUser.email,savedUser.roles,savedUser.courses?.map(course => course.name) || [])
    }
    async unregisterCourse(user_id : string , course_id : string): Promise<UserResponse> {
        const user = await this.userRepository.findOne({
            where: { id: user_id },
            relations: ["courses"],
        });
        const course = await this.courseService.getDetailCourseDemo(course_id)
        if(!user || !course) throw new HttpException("User or Course not found",HttpStatus.NOT_FOUND)
        const userCourse = user.courses
        const courseName = course.name
        user.courses = userCourse.filter(c => c.name !== courseName)
        const savedUser =  await this.userRepository.save(user);
        return new UserResponse(savedUser.name,savedUser.email,savedUser.roles,savedUser.courses?.map(course => course.name) || [])
    }
}
