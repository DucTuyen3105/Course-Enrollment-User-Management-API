import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
export class UpdateUserRequest{
    @ApiProperty({description: "chỉ được đổi password"})
    @IsString()
    password: string
}