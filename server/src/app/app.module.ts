import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { configModule } from '../configure.root';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { UserModule } from 'src/user/user.module';
import { ConferenceModule } from 'src/conference/conference.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/middleware/auth.middleware';

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRootAsync({
      imports: [configModule],
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: config.get<'mysql'>('DB_TYPE'),

        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),

        database: config.get<'string'>('DB_DATABASE'),

        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),

        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    ConferenceModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '.*', method: RequestMethod.GET })
      .exclude('/auth')
      .forRoutes('*');
  }
}
