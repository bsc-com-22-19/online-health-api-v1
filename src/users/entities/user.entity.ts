import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Posts } from "src/posts/entities/posts.entity";

@Entity({name: 'users'})

export class User extends BaseEntity{

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

    @OneToMany(() => Posts, post => post.user)
    posts: Posts[];


}