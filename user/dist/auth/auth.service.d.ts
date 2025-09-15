import { UserService } from "../user/user.service";
import { SignInRequest } from "../dto/request/SignInRequest";
import { JwtService } from "@nestjs/jwt";
import { CreateUserRequest } from "../dto/request/CreateUserRequest";
import { LogOutRequest } from "../dto/request/LogOutRequest";
import { Repository } from "typeorm";
import { TokenEntity } from "../entities/token.entity";
import { SignInResponse } from "../dto/response/SignInResponse";
import { UserResponse } from "../dto/response/UserResponse";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly tokenRepository;
    constructor(userService: UserService, jwtService: JwtService, tokenRepository: Repository<TokenEntity>);
    signIn(request: SignInRequest): Promise<SignInResponse>;
    signUp(request: CreateUserRequest): Promise<UserResponse>;
    logOut(request: LogOutRequest): Promise<any>;
    tokenInvalid(jwId: string): Promise<any>;
}
