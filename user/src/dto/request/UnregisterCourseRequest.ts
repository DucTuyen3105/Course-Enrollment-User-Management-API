import {IsString} from "class-validator";

export class UnregisterCourseRequest {
    @IsString()
    user_id : string
    @IsString()
    course_id : string
}