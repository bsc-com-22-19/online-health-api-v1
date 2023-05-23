import { Controller,Post,Get,Delete,Param,Body,Res,Patch,ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity'; 
import { CreateUserDTo } from './entities/dto/create-user.dto';
import { UpdateUserDto } from './entities/dto/update-user.dto';
//import { ApiTags} from '@nestjs/swagger';

//@ApiTags('USER')
@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    @Post()
    async createPosts(@Body(ValidationPipe) createuserDto: CreateUserDTo){

        const newUser= await this.userService.createPosts(createuserDto);
        return newUser;
    }

    @Get(":id")
    async getUserById(@Param("id") userId:number, @Res() res): Promise <User> {

        const user = await this.userService.getPostsById(userId);
        return res.status(200).send(user);
    }

    @Patch(":id")
    async updateUserById(@Body(ValidationPipe) updateUserDto: UpdateUserDto, @Param("id") userId:number, @Res()res): Promise<User>{

        const updatedPosts = await this.userService.updatePostsById(updateUserDto,userId);
        return res.status(201).send(updateUserDto);
    }

    @Delete(":id")
    async deleteUserById(@Param("id") userId:number, @Res()res ): Promise <void> {

        await this.userService.deletePosts(userId);
        res.status(201).send();
    }




}
