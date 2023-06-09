import {ConfigService} from '@nestjs/config';
import {Injectable} from '@nestjs/common';

@Injectable()
export class DatabaseConfigService {
    constructor(
        private configService: ConfigService
    ){}

    getHost(): string {
        return this.configService.get<string>('DB_HOST');
    }

    getPort(): number {
        return parseInt(this.configService.get<string>('DB_port'));
    }

    getUserName(): string {
        return this.configService.get<string>('DB_USERNAME');
    }

    getPassword(): string {
        return this.configService.get<string>('DB_PASSWORD');

    }

    getDatabaseName(): string {
        return this.configService.get<string>('DB_NAME');
    }
}