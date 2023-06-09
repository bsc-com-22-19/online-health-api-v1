import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { CreateCommentsDTo } from './entities/dto/create-comments.dto';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UserService } from 'src/users/user/user.service';

@Injectable()
export class CommentsService{
    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,
        private userService: UserService
    ){}

    async createComment(createComment: CreateCommentsDTo, userId: number): Promise <Comments> {
        const user = await this.userService.getUserById(userId);

        const comment = new Comments();
        comment.name = user.lastName
        comment.comment = createComment.comment;
        comment.user = user;

        const savedComment = await this.commentsRepository.save(comment);
        return savedComment;
    }

    async getCommentById(cId: number): Promise <Comments> {
        
        const comment = await this.commentsRepository.findOne({
            where: {
                id: cId
            },
        });
        
        if(!comment){
            throw new NotFoundException("Posts Not Found");
        }

        return comment;
    }

    async getAllComments(): Promise<Comments[]> {
        return await this.commentsRepository.find();
    }

    async deleteComment(id: number): Promise <void> {
        const comment = await this.getCommentById(id);
        await this.commentsRepository.delete(comment);
    }
}
