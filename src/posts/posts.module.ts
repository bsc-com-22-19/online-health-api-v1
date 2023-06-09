import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {Posts} from "./entities/posts.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AdminService } from 'src/users/admin/admin.service';
import { Admin } from 'src/users/admin/entities/admin.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Posts, Admin])],
  controllers: [PostsController],
  providers: [PostsService, AdminService]
})
export class PostsModule {}
