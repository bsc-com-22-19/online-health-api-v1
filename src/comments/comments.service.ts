import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { CreateCommentsDTo } from './entities/dto/create-comments.dto';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CommentsService{
    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>
    ){}

    async createComment(createComment: CreateCommentsDTo): Promise <Comments> {
        const comment = new Comments();
        comment.name = createComment.name;
        comment.comment = createComment.comment;

        const savedComment = await this.commentsRepository.save(comment);
        return savedComment;
    }

    async getCommentById(id: number): Promise <Comments> {
        const options: FindOneOptions <Comments> = {
            where: {
                id
            },
        };

        const comment = await this.commentsRepository.findOne(options);
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
