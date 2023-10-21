import { Module } from '@nestjs/common';
import { ConferenceController } from './conference.controller';
import { ConferenceService } from './conference.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conference } from 'src/database/conference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conference])],
  controllers: [ConferenceController],
  providers: [ConferenceService],
  exports: [ConferenceService],
})
export class ConferenceModule {}
