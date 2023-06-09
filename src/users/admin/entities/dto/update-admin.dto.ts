import { IsOptional } from "class-validator";

export class UpdateAdminDto {
    @IsOptional()
    firstName:string;

    @IsOptional()
    lastName:string;

    @IsOptional()
    email:string;

    @IsOptional()
    phoneNumber:string;

    @IsOptional()
    password: string;
}