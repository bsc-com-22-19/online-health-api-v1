import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Posts{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column()
    Summary: string;

    @Column()
    imageurl: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;
}