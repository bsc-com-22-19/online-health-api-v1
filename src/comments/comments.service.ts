import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { CreateCommentsDTo } from './entities/dto/create-comments.dto';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    deletecomments(commentsId: number) {
        throw new Error('Method not implemented.');
    }
    commentsRepository: any;

    // create comments
    async createComments(CreateCommentsDto: CreateCommentsDTo): Promise <Comments>{
        
        const newComments= new Comments();
        newComments.comment= CreateCommentsDto.comment;
        newComments.name = CreateCommentsDto.name;

        const createdComments = await this.commentsRepository.save(newComments);
        return createdComments;

    }

    // get comments details by id
    async getCommentsById(id:number): Promise <Comments> {

        const options: FindManyOptions <Comments> ={
            where: { id },
        }

        const comments = await this.commentsRepository.findOne(options);
        if(!comments){
            throw new NotFoundException("Posts Not Found");
        }

        return comments;
    }


}
