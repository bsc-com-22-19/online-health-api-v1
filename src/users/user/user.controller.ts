import { Controller,Post,Get,Delete,Param,Body,Res,Patch,ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTo } from './entities/dto/create-user.dto';
import { error } from 'console';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './entities/dto/update-user.dto';

//import { ApiTags} from '@nestjs/swagger';

//@ApiTags('USER')
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post()
    async createUser(@Body(ValidationPipe) createUser: CreateUserDTo): Promise <User>{
        try{
            const admin= await this.userService.createUser(createUser);
            return admin;
        }catch(err){
            console.log(err);
            throw new error('Failed To Create New Admin');
        }
    }

    @Get(":id")
    async getUserById(@Param("id") id:number, @Res() res): Promise <User> {
        try{
            const user = await this.userService.getUserById(id);
            return res.status(200).send(user);
        }catch(err){
            console.log(err);
            throw new error('Failed To Get User');
        }
    }

    @Patch(":id")
    async updateUserById(
        @Body(ValidationPipe) updateUser: UpdateUserDto,
        @Param("id") id:number,
        @Res()res
    ): Promise<User>{
        try{
            const user = await this.userService.updateUserById(updateUser, id);
            return res.status(201).send(user);
        }catch(err){
            console.log(err);
            throw new error('Failed To Update User');
        }
    }

    @Delete(":id")
    async deleteAdminById(@Param("id") id:number, @Res()res ): Promise <void> {
        try{
            await this.userService.deleteUser(id);
            res.send(`Admin With ID ${id} Deleted Successfully`);
        }catch(err){
            console.log(err);
            throw new error('Failed To Delete Admin');
        }
    }
}
