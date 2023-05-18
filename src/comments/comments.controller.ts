import { Controller, Post ,Get, ValidationPipe, Param, Res, Delete, Body} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from './entities/comments.entity';
import { CreateCommentsDTo } from './entities/dto/create-comments.dto';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService,
    ){}

    @Post()
    async createComment(@Body(ValidationPipe) createCommentDto: CreateCommentsDTo){

        const newPosts = await this.commentsService.createComments(createCommentDto);
        return Comments;
    }

    @Get(":id")
    async getPostsById(@Param("id") postsId:number, @Res() res): Promise <Comments> {

        const comments = await this.commentsService.getCommentsById(commentsId);
        return res.status(200).send(comments);
    }

    @Delete(":id")
    async deleteCommentsById(@Param("id") commentsId:number, @Res()res ): Promise <void> {

        await this.commentsService.deletecomments(commentsId);
        res.status(201).send();
    }


}
