import { Module } from '@nestjs/common';
import { ConferenceController } from './conference.controller';
import { ConferenceService } from './conference.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conference } from 'src/database/conference.entity';
import { CommentsModule } from 'src/comments/comments.module';
import { AttachmentModule } from 'src/attachment/attachment.module';
import { Audience } from 'src/database/audience.entity';
import { AudienceService } from './audience.service';

@Module({
  imports: [
    CommentsModule,
    AttachmentModule,
    TypeOrmModule.forFeature([Conference, Audience]),
  ],
  controllers: [ConferenceController],
  providers: [ConferenceService, AudienceService],
  exports: [ConferenceService],
})
export class ConferenceModule {}
