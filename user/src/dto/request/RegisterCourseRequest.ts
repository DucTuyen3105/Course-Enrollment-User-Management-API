export class RegisterCourseRequest{
    user_id: string
    course_id: string
    constructor(user_id,course_id) {
        this.user_id = user_id
        this.course_id = course_id
    }
}