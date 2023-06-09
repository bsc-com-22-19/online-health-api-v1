import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from 'src/users/admin/entities/admin.entity';

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

    @ManyToOne(() => Admin, admin => admin.posts)
    admin: Admin;
}