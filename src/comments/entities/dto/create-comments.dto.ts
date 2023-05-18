import  {IsString} from 'class-validator';
import {ApiProperty} from 'fastify-swagger';

export class CreateCommentsDTo{
    @IsString()
    name:string;

    @IsString()
    comment:string;
}
