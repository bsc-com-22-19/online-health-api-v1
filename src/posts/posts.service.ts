import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { CreatePostsDto } from './entities/dto/create-posts.dto';
import { UpdatePostsDto } from './entities/dto/update-posts.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private readonly postsRepository: Repository <Posts>,
        private readonly userService: UsersService,
    ){}

    // create post
    async createPosts(CreatePostsDto: CreatePostsDto, authorsId: number): Promise <Posts>{
        const author = await this.userService.getUserById(authorsId);
        
        const newPosts = new Posts();
        newPosts.Summary = CreatePostsDto.summary;
        newPosts.imageurl = CreatePostsDto.imageurl;
        newPosts.title = CreatePostsDto.title;
        newPosts.user;

        const createdPosts = await this.postsRepository.save(newPosts);
        return createdPosts;

    }

    // get posts details by id
    async getPostsById(id: number): Promise <Posts> {

        const options: FindManyOptions <Posts> ={
            where: { id },
        }

        const posts = await this.postsRepository.findOne(options);
        if(!posts){
            throw new NotFoundException("Posts Not Found");
        }

        return posts;
    }

    // update details of posts by id
    async updatePostsById(UpdatePostsDto: UpdatePostsDto, postsId:number): Promise <Posts>{

        const PostsToUpdate = await this.getPostsById(postsId);

        // passing new values
        Object.assign(PostsToUpdate,UpdatePostsDto);

        const updatedPosts = await this.postsRepository.save(PostsToUpdate);
        return updatedPosts;
    }
    async getAllPosts(): Promise <Posts[]> {
        return await this.postsRepository.find();
    }

    // delete posts from the system
    async deletePosts(postsId:number): Promise <void> {

        const posts = await this.getPostsById(postsId);
        await this.postsRepository.remove(posts);
    }

 

}
