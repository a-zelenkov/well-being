import { ConfigModule } from '@nestjs/config/dist';

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['../.env.development', '.env', '../.env'],
});
