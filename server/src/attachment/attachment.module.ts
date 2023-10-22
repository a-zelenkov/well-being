import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { Attachment } from 'src/database/attachment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
