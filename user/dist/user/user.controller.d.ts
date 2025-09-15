import { UserService } from "./user.service";
import { CreateUserRequest } from "../dto/request/CreateUserRequest";
import { UserResponse } from "../dto/response/UserResponse";
import { UpdateUserRequest } from "../dto/request/UpdateUserRequest";
import { GlobalResponseType } from "../GlobalResponse/global.response.type";
import { ListUserResponseForAdmin } from "../dto/response/ListUserResponseForAdmin";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getListUser(): Promise<GlobalResponseType<ListUserResponseForAdmin[]>>;
    getDetailUser(id: string): Promise<GlobalResponseType<UserResponse>>;
    createUser(request: CreateUserRequest): Promise<GlobalResponseType<UserResponse>>;
    updateUser(req: any, request: UpdateUserRequest): Promise<GlobalResponseType<UserResponse>>;
    deleteUser(id: string): Promise<GlobalResponseType<UserResponse>>;
    registerCourse(id1: string, id2: string): Promise<GlobalResponseType<UserResponse>>;
    unregisterCourse(id1: string, id2: string): Promise<GlobalResponseType<UserResponse>>;
    getSelfUser(req: any): Promise<GlobalResponseType<UserResponse>>;
}
