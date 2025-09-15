import {IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
export class SignInRequest{
    @ApiProperty({description : "Tên đăng nhập không được để trống",example: "tuyen"})
    @IsString()
    name: string
    @ApiProperty({description : "Mật khẩu không được để trống"})
    @ApiProperty({description: "Mật khẩu phải có ít nhất 5 kí tự})",example: "12345"})
    //thuộc tính required để cho phép người dùng k cần điền field đấy
    @IsString()
    password: string
}