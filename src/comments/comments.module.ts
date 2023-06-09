import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comments } from './entities/comments.entity';
import { UserService } from 'src/users/user/user.service';
import { User } from 'src/users/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, User])],
  controllers: [CommentsController],
  providers: [CommentsService, UserService]
})
export class CommentsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .exclude()
    .forRoutes(CommentsController)
  }
}
