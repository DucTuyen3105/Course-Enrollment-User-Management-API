import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('token')
export class TokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string
    constructor(id : string) {
        this.id = id;
    }
}