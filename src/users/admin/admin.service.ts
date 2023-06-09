import { BadRequestException, Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/password.util';
import { Admin } from './entities/admin.entity';
import { CreateAdminDTo } from './entities/dto/create-admin.dto';
import { UpdateAdminDto } from './entities/dto/update-admin.dto';
import { jwtConstants } from 'src/auth/constants';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository <Admin>,
        private jwtService: JwtService,
    ){}

    //ctreate admin
    async createAdmin(createAdmin: CreateAdminDTo): Promise <Admin>{
        
        const admin = new Admin();
        admin.firstName = createAdmin.firstName;
        admin.lastName = createAdmin.lastName;
        admin.phoneNumber = createAdmin.phoneNumber;
        admin.password = await hashPassword(createAdmin.password);

        if(createAdmin.password !== createAdmin.confirmPassword){
            throw new BadRequestException('Passwords Do not Match');
        }

        return await this.adminRepository.save(admin)

    }

     // get Admin details by id
     async getAdminById(adminId:number): Promise <Admin> {

        const admin = await this.adminRepository.findOne({
            where: {
                id: adminId
            },
        });

        if(!admin){
            throw new NotFoundException("User Not Found");
        }

        return admin;
    }

     // update details of Admin by id
     async updateAdminById(updateAdmin: UpdateAdminDto, adminId:number): Promise <Admin>{

        const admin = await this.getAdminById(adminId);

        // passing new values
        Object.assign(admin, updateAdmin);

        return await this.adminRepository.save(admin);
    }

    async findbyEmail(adminEmail: string): Promise <Admin>{
        const email = await this.adminRepository.findOne({
            where: {
                email: adminEmail
            },
        });

        if(!email){
            throw new NotFoundException('${adminEmail} Does Not Exist');
        }
        return email;

    }


    async getAllAdmin(): Promise <Admin[]> {
        return await this.adminRepository.find();
    }


     // delete Admin from the system
     async deleteAdmin(adminId:number): Promise <void> {

        const admin = await this.getAdminById(adminId);
        await this.adminRepository.remove(admin);
    }

    async validateCredentials(email:string,password:string): Promise <Admin>{
        const admin = await this.findbyEmail(email);
        if(!admin && bcrypt.compareSync(password,admin.password)){
            throw new UnauthorizedException('invalid email or password');
        }
        return admin;
    }

    async createJwtToken(admin:Admin): Promise <{token:string}> {
        const payload = {
            email: admin.email,
            sub: admin.id,
            role: 'admin,'
        };
        const token = await this.jwtService.sign(payload, {secret: jwtConstants.secret})
        return {token};
    }

    async login(email: string, password: string): Promise <{token: string}>{
        const admin = await this.validateCredentials(email,password);

        if(Admin){
            return await this.createJwtToken(admin);
        }
    }



}
