import { Controller,Post,Get,Delete,Param,Body,Res,Patch,ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDTo } from './entities/dto/create-admin.dto';
import { Admin } from 'typeorm';
import { UpdateAdminDto } from './entities/dto/update-admin.dto';
import { error } from 'console';
//import { ApiTags} from '@nestjs/swagger';

//@ApiTags('ADMIN')
@Controller('admin')
export class AdminController {
    constructor(private adminService:AdminService){}

    @Post()
    async createAdmin(@Body(ValidationPipe) createAdmin: CreateAdminDTo){
        try{
            const admin= await this.adminService.createAdmin(createAdmin);
            return admin;
        }catch(err){
            console.log(err);
            throw new error('Failed To Create New Admin');
        }
    }

    @Get(":id")
    async getAdminById(@Param("id") id:number, @Res() res): Promise <Admin> {
        try{
            const admin = await this.adminService.getAdminById(id);
            return res.status(200).send(admin);
        }catch(err){
            console.log(err);
            throw new error('Failed To Get Admin');
        }
    }

    @Patch(":id")
    async updateAdminById(
        @Body(ValidationPipe) updateAdmin: UpdateAdminDto,
        @Param("id") id:number,
        @Res()res
    ): Promise<Admin>{
        try{
            const admin = await this.adminService.updateAdminById(updateAdmin, id);
            return res.status(201).send(admin);
        }catch(err){
            console.log(err);
            throw new error('Failed To Update Admin');
        }
        
    }

    @Delete(":id")
    async deleteAdminById(@Param("id") id:number, @Res()res ): Promise <void> {
        try{
            await this.adminService.deleteAdmin(id);
            res.send(`Admin With ID ${id} Deleted Successfully`);
        }catch(err){
            console.log(err);
            throw new error('Failed To Delete Admin');
        }
    }
}
