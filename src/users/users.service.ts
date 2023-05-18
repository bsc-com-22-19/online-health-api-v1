import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions , Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTo } from './entities/dto/create-user.dto';
import { UpdateUserDto } from './entities/dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
    [x: string]: any;
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository <User>
    ){}
    // create user
    async createPosts(createUser: CreateUserDTo): Promise <User>{
        
        const newUser = new User();
        newUser.firstName= createUser.firstName;
        newUser.lastName = createUser.lastName;
        newUser.email = createUser.email;
        newUser.phoneNumber = createUser.phoneNumber;
        newUser.password = createUser.password;

        const createdPosts = await this.postsRepository.save(newUser);
        return createdPosts;

    }

     // get user details by id
     async getPostsById(id:number): Promise <User> {

        const options: FindManyOptions <User> ={
            where: { id },
        }

        const user = await this.userRepository.findOne(options);
        if(!user){
            throw new NotFoundException("User Not Found");
        }

        return user;
    }

     // update details of user by id
     async updateUserById(UpdateUserDto: UpdateUserDto, userId:number): Promise <User>{

        const UserToUpdate = await this.getUSerById(userId);

        // passing new values
        Object.assign(UserToUpdate,UpdateUserDto);

        const updatedUser= await this.userRepository.save(UserToUpdate);
        return updatedUser;
    }
    async getAllUser(): Promise <User[]> {
        return await this.userRepository.find();
    }

     // delete user from the system
     async deleteUser(userId:number): Promise <void> {

        const user = await this.getUserById(userId);
        await this.userRepository.remove(user);
    }





    }
