import { IsString, IsOptional } from 'class-validator';
//import {ApiProperty} from '@nestjs/swagger';

export class CreatePostsDto {
    @IsString()
   /* @ApiProperty({
        description:'name',
        example:'cholera preventive measures'
    })*/
    title: string;

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