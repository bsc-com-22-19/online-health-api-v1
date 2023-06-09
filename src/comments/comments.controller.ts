import { Controller, Post ,Get, ValidationPipe, Param, Res, Delete, Body, NotFoundException} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from './entities/comments.entity';
import { CreateCommentsDTo } from './entities/dto/create-comments.dto';
//import { ApiTags } from '@nestjs/swagger';

//@ApiTags('COMMENTS')
@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService,
    ){}

    @Post('comment/:cId')
    async createComment(
        @Body(ValidationPipe) createComment: CreateCommentsDTo,
        @Param('cId') cId: number,
        @Res() res
    ){
        try{
            const comment = await this.commentsService.createComment(createComment, cId);
            return res.send(comment);
        }catch(err){
            console.log(err);
            throw new NotFoundException('Not Found');
        }
    }

    @Get()
    async getAllComment(){
        try{
            const comments = await this.getAllComment();
            return comments;
        }catch(err){
            console.log(err);
            throw new NotFoundException('Not Found');
        }
    }

    @Get("comment/:id")
    async getPostsById(@Param("id") cId:number, @Res() res): Promise <Comments> {

        try{
            const comments = await this.commentsService.getCommentById(cId);
            return res.status(200).send(comments);
        }catch(err){
            console.log(err);
            throw new NotFoundException('Not Found');
        }
    }

    @Delete(":id")
    async deleteCommentsById(@Param("id") cId:number, @Res()res ): Promise <void> {
        try{
            await this.commentsService.deleteComment(cId);
            res.status(201).send();
        }catch(err){
            console.log(err);
            throw new NotFoundException('Not Found');
        }
    }

}
