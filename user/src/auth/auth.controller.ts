import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {SignInRequest} from "../dto/request/SignInRequest";
import {AuthService} from "./auth.service";
import {Public} from "../decorator/auth.decorator";
import {CreateUserRequest} from "../dto/request/CreateUserRequest";
import {LogOutRequest} from "../dto/request/LogOutRequest";
import {GlobalResponseData} from "../GlobalResponse/global.response.data";
import {SignInResponse} from "../dto/response/SignInResponse";
import {GlobalResponseType} from "../GlobalResponse/global.response.type";
import {UserResponse} from "../dto/response/UserResponse";
import {ApiOperation} from "@nestjs/swagger";


@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {
    }
    @Post('SignIn')
    @Public()
    @ApiOperation({summary: 'Đăng nhập (role : admin,user)'})
    async signIn(@Body(new ValidationPipe()) request : SignInRequest) : Promise<GlobalResponseType<SignInResponse>>
    {
        return new GlobalResponseData(await this.authService.signIn(request),"SUCCESS",200)
    }
    @Post('SignUp')
    @Public()
    @ApiOperation({summary: 'Đăng kí (role : admin,user)'})
    async signUp(@Body(new ValidationPipe()) request : CreateUserRequest) : Promise<GlobalResponseType<UserResponse>>
    {
        return new GlobalResponseData(await this.authService.signUp(request),"SUCCESS",200)
    }
    @Post('LogOut')
    @Public()
    @ApiOperation({summary: 'vô hiệu hóa token (role : admin,user)'})
    async logOut(@Body() request : LogOutRequest) : Promise<GlobalResponseType<string>>
    {
        console.log(request)
        return new GlobalResponseData(await this.authService.logOut(request),"SUCCESS",200)
    }
}
