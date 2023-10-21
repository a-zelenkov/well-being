import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { configModule } from '../configure.root';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { GoogleStrategy } from 'src/auth/strategy/google.strategy';
import { UserModule } from 'src/user/user.module';
// import { User } from 'src/database/user.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
