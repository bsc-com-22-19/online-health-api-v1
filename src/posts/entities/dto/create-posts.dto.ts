import { IsString, IsOptional } from 'class-validator';
import {ApiProperty} from 'fastify-swagger';

export class CreatePostsDto {
    @IsString()
   /* @ApiProperty({
        description:'name',
        example:'cholera preventive measures'
    })*/
    name: string;

    @IsString()
    /*@ApiProperty({
        description:'summary',
        example:'cholera can be prevented by washing hands '
    })*/
    summary: string;

    @IsOptional()
    /*@ApiProperty({
        description:'imageurl',
        example:'https:health-api/src'
    })*/
    imageurl: string;

}