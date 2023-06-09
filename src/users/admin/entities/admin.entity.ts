import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Posts } from "src/posts/entities/posts.entity";
import { MinLength, matches } from "class-validator";

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column({unique: true})
    email:string;

    @Column()
    phoneNumber:string;

    @Column()
    password: string;

    @OneToMany(() => Posts, post => post.admin)
    posts: Posts[];


}