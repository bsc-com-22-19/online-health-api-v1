import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfigService } from "./database.config";
import {ConfigurationModule} from './config.module';
import { ConfigService } from "@nestjs/config";
import { Admin } from "src/users/admin/entities/admin.entity";
import { User } from "src/users/user/entities/user.entity";
import { Comments } from "src/comments/entities/comments.entity";
import { Posts } from "src/posts/entities/posts.entity";
import { configDotenv } from "dotenv";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [DatabaseConfigService],
            useFactory: (ConfigService: DatabaseConfigService) => ({
                type:'mysql',
                host: ConfigService.getHost(),
                port: ConfigService.getPort(),
                username: ConfigService.getUserName(),
                password: ConfigService.getPassword(),
                database: ConfigService.getDatabaseName(),
                entities:[Admin,User,Comments,Posts],
                synchronize:true,

            }),
        }),
    ],
    providers: [DatabaseConfigService,ConfigService],
})
export class DatabaseModule{}