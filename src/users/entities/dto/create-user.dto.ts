import  {IsString} from 'class-validator';
import {ApiProperty} from 'fastify-swagger';

export class CreateUserDTo{
    @IsString()
    firstName:string;

    @IsString()
    lastName:string;

    @IsString()
    email:string;

    @IsString()
    phoneNumber:string;

    @IsString()
    password:string;

}