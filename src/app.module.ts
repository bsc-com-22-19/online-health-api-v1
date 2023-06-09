import { Module } from '@nestjs/common';
import { ConfigurationModule} from 'config/config.module';
import { DatabaseModule } from 'config/database.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { AdminModule } from './users/admin/admin.module';
import { UserModule } from './users/user/users.module';
import { Admin } from './users/admin/entities/admin.entity';
import { Posts } from './posts/entities/posts.entity';
import { Comments } from './comments/entities/comments.entity';
import { User } from './users/user/entities/user.entity';


@Module({
  imports: [
    // database modules
    ConfigurationModule,
    DatabaseModule,

    // user service modules
    AdminModule,
    UserModule,
    CommentsModule,
    PostsModule,

  ],
  providers: [Admin,User,Comments,Posts],
})
export class AppModule{}


