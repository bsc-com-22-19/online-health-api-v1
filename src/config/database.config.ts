import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = async(
    configService: ConfigService,
    name: string
): Promise <TypeOrmModuleOptions> => {
    return {
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        //port: parseInt(configService.get<string>('DB_PORT') || 3306),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '../**/*.entity{.ts,.js}'],
        synchronize: true,
    }
}