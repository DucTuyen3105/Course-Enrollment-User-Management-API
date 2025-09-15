import { Repository } from "typeorm";
import { UserResponse } from "../dto/response/UserResponse";
import { CreateUserRequest } from "../dto/request/CreateUserRequest";
import { UpdateUserRequest } from "../dto/request/UpdateUserRequest";
import { SignInRequest } from "../dto/request/SignInRequest";
import { UserValidateResponse } from "../dto/response/UserValidateResponse";
import { UserEntity } from "../entities/user.entity";
import { RegisterCourseRequest } from "../dto/request/RegisterCourseRequest";
import { CourseService } from "../course/course.service";
import { ListUserResponseForAdmin } from "../dto/response/ListUserResponseForAdmin";
export declare class UserService {
    private readonly userRepository;
    private readonly courseService;
    constructor(userRepository: Repository<UserEntity>, courseService: CourseService);
    getListUser(): Promise<ListUserResponseForAdmin[]>;
    createUser(request: CreateUserRequest): Promise<UserResponse>;
    getDetail(id: string): Promise<UserResponse>;
    updateUser(userId: string, request: UpdateUserRequest): Promise<any>;
    deleteUser(id: string): Promise<UserResponse[]>;
    validateUser(request: SignInRequest): Promise<Boolean | UserValidateResponse>;
    initAdmin(): Promise<any>;
    registerCourse(request: RegisterCourseRequest): Promise<UserResponse>;
    unregisterCourse(user_id: string, course_id: string): Promise<UserResponse>;
}
