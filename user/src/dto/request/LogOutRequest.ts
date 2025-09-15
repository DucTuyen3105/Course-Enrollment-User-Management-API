import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LogOutRequest{
    @ApiProperty({description :"điền token để logout"})
    @IsString()
    token : string
}