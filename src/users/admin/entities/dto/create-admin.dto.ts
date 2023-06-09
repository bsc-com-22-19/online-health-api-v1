import  {IsNotEmpty, IsString, Matches, MinLength, matches} from 'class-validator';
import {ApiProperty} from 'fastify-swagger';

export class CreateAdminDTo{
    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    lastName:string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    phoneNumber:string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    @Matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
        {
            message: 'Password is too week it must have atleast a lowercase & uppercase letter,number '
    })
    password:string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}