export class UserValidateResponse{
    id : string
    name : string
    roles : string
    constructor(id : string,name : string,roles : string){
        this.id = id
        this.name = name
        this.roles = roles
    }
}