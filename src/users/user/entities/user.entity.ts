import {Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comments } from "src/comments/entities/comments.entity";

@Entity()

export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    email:string;

    @Column()
    phoneNumber:string;

    @Column()
    password: string;

    @OneToMany(() => Comments, comment => comment.user)
    comments: Comment[];


}