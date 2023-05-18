import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPosts: any;
  getHello(): string {
    return 'Hello World!';
  }
}
