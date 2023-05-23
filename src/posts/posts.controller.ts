import { Controller ,Post,Get,Delete,Param,Body,Res,Patch, ValidationPipe} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {Posts} from "./entities/posts.entity";
import { CreatePostsDto } from './entities/dto/create-posts.dto';
import { UpdatePostsDto } from './entities/dto/update-posts.dto';
//import {ApiTags} from '@nestjs/swagger';


//@ApiTags('POSTS')
@Controller('posts')
export class PostsController {
    constructor(private postsService:PostsService){}

    @Post('id')
    async createPosts(
        @Body(ValidationPipe) createPostsDto: CreatePostsDto,
        @Param('id') id:number,
    ){

        const newPosts = await this.postsService.createPosts(createPostsDto, id);
        return newPosts;
    }

    @Get(":id")
    async getPostsById(@Param("id") postsId:number, @Res() res): Promise <Posts> {

        const posts = await this.postsService.getPostsById(postsId);
        return res.status(200).send(posts);
    }

    @Patch(":id")
    async updatePostsById(@Body(ValidationPipe) updatePostsDto: UpdatePostsDto, @Param("id") postsId:number, @Res()res): Promise<Posts>{

        const updatedPosts = await this.postsService.updatePostsById(updatePostsDto,postsId);
        return res.status(201).send(updatedPosts);
    }

    @Delete(":id")
    async deletePostsById(@Param("id") postsId:number, @Res()res ): Promise <void> {

        await this.postsService.deletePosts(postsId);
        res.status(201).send();
    }

}
