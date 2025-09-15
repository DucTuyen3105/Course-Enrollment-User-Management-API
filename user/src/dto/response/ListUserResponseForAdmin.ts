import {Transform} from "class-transformer";

export class ListUserResponseForAdmin{
    id : string
    name: string
    @Transform(({ value }) => value && value.length > 0 ? value : undefined)
    email: string
    @Transform(({ value }) => (value && value.length > 0 ? value : undefined))
    roles: string
    @Transform(({ value }) => (value && value.length > 0 ? value : undefined))
    courses: string[]
    constructor(id : string,name: string, email: string,roles : string,courses :string[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
        this.courses = courses
    }
}