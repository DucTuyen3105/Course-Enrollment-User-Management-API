import { SignInRequest } from "../dto/request/SignInRequest";
import { AuthService } from "./auth.service";
import { CreateUserRequest } from "../dto/request/CreateUserRequest";
import { LogOutRequest } from "../dto/request/LogOutRequest";
import { SignInResponse } from "../dto/response/SignInResponse";
import { GlobalResponseType } from "../GlobalResponse/global.response.type";
import { UserResponse } from "../dto/response/UserResponse";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(request: SignInRequest): Promise<GlobalResponseType<SignInResponse>>;
    signUp(request: CreateUserRequest): Promise<GlobalResponseType<UserResponse>>;
    logOut(request: LogOutRequest): Promise<GlobalResponseType<string>>;
}
