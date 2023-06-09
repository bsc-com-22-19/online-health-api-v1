import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { Admin } from 'typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';



@Module({
  imports:[TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .exclude()
      .forRoutes(AdminController)
  }
}