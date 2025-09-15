import {IsEmail, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserRequest{
    @ApiProperty({description:"Tên đăng nhập không được để trống và nhiều hơn 5 kí tự",example:"tuyen"})
    @MinLength(5,{message: "Invalid Length"})
    @IsString({message : "Username Invalid"})
    name : string
    @ApiProperty({description:"email có đuôi @gmail.com",example:"tuyen@gmail.com"})
    @IsEmail({},{message : "Email Invalid"})
    email : string
    @ApiProperty({description:"Mật khẩu không được để trống và phải có ít nhất 5 kí tự",example:"12345"})
    @IsString({message : "Password Invalid"})
    @MinLength(5,{message :"Password  higher than 5 character"})
    password: string
}