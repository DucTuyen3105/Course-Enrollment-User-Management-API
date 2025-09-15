import {IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CourseRequest{
    @ApiProperty({description:"Điền tên khóa học,không được để trống và có ít nhất 5 kí tự",example:"java"})
    @IsString()
    @MinLength(5,{message: "Invalid Length (Length >=5)"})
    name : string;
}