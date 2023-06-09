import { Entity , PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { User } from 'src/users/user/entities/user.entity';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    comment:string;

    @ManyToOne(() => User, user => user.comments)
    user: User;

}