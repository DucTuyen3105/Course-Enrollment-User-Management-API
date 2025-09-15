import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {SignInRequest} from "../dto/request/SignInRequest";
import {JwtService} from "@nestjs/jwt";
import {CreateUserRequest} from "../dto/request/CreateUserRequest";
import {LogOutRequest} from "../dto/request/LogOutRequest";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TokenEntity} from "../entities/token.entity";
import {SignInResponse} from "../dto/response/SignInResponse";
import {UserResponse} from "../dto/response/UserResponse";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService,
                @InjectRepository(TokenEntity) private readonly tokenRepository : Repository<TokenEntity>) {
    }
    async signIn(request : SignInRequest): Promise<SignInResponse> {
        const userValidateResponse = await this.userService.validateUser(request)
        const idToken = await this.tokenRepository.save({})
        const payload = {jwtId : idToken.id,...userValidateResponse};
        const access_token =  await this.jwtService.signAsync(payload);
        return new SignInResponse(access_token);
    }
    async signUp(request : CreateUserRequest): Promise<UserResponse>
    {
        return await this.userService.createUser(request)
    }
    async logOut(request : LogOutRequest): Promise<any>
    {
        try {
            await this.jwtService.verifyAsync(request.token);
        } catch {
            throw new UnauthorizedException("WrongTokenFormat");
        }
        const decodedToken = await this.jwtService.decode(request.token)
        const findExistToken = await this.tokenRepository.findOneBy({id : decodedToken.jwtId})
        if(findExistToken)
        {
            this.tokenRepository.delete(findExistToken)
            return "LogOutSuccessfully"
        }
        throw new UnauthorizedException("Invalid token")
    }
    // for auth guard
    async tokenInvalid(jwId : string) : Promise<any>
    {
        return this.tokenRepository.existsBy({id : jwId})
    }
}
