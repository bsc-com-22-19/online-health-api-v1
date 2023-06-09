import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { FindManyOptions , Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTo } from './entities/dto/create-user.dto';
import { hashPassword } from 'src/utils/password.util';
import { UpdateUserDto } from './entities/dto/update-user.dto';
import { jwtConstants } from 'src/auth/constants';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { privateEncrypt } from 'crypto';



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository <User>,
        private jwtService: JwtService,
        
    ){}
    // create user
    async createUser(createUser: CreateUserDTo): Promise <User>{
        
        const user = new User();
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.phoneNumber = createUser.phoneNumber;
        user.email = createUser.email;
        user.password = await hashPassword(createUser.password);


        if(createUser.password !== createUser.confirmPassword){
            throw new BadRequestException('Passwords Do not Match');
        }

        return await this.userRepository.save(user)

    }

     // get user details by id
     async getUserById(userId:number): Promise <User> {

        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
        });

        if(!user){
            throw new NotFoundException("User Not Found");
        }

        return user;
    }

    async findbyEmail(userEmail: string): Promise <User>{
        const email = await this.userRepository.findOne({
            where: {
                email: userEmail
            },
        });

        if(!email){
            throw new NotFoundException('${userEmail} Does Not Exist');
        }
        return email;

    }


     // update details of user by id
     async updateUserById(updateUser: UpdateUserDto, userId:number): Promise <User>{

        const user = await this.getUserById(userId);

        // passing new values
        Object.assign(user, updateUser);

        return await this.userRepository.save(user);
    }


    async getAllUsers(): Promise <User[]> {
        return await this.userRepository.find();
    }


     // delete user from the system
     async deleteUser(userId:number): Promise <void> {

        const user = await this.getUserById(userId);
        await this.userRepository.remove(user);
    }

    async validateCredentials(email:string,password:string): Promise <User>{
        const user = await this.findbyEmail(email);
        if(!user && bcrypt.compareSync(password,user.password)){
            throw new UnauthorizedException('invalid email or password');
        }
        return user;
    }

    async createJwtToken(user:User): Promise <{token:string}> {
        const payload = {
            email: user.email,
            sub: user.id,
            role: 'user'
        };
        const token = await this.jwtService.sign(payload, {secret: jwtConstants.secret})
        return {token};
    }

    async login(email: string, password: string): Promise <{token: string}>{
        const user = await this.validateCredentials(email,password);

        if(user){
            return await this.createJwtToken(user);
        }
    }


}
