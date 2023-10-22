import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from 'src/database/attachment.entity';
import { CreateAttachmentDto } from 'src/dto/attachment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentsRepository: Repository<Attachment>,
  ) {}
  async getByConferenceId(id: number) {
    const comments = await this.attachmentsRepository.find({
      where: { conferenceId: id, isDeleted: false || null },
    });
    return comments;
  }

  async create(details: CreateAttachmentDto) {
    try {
      const conference = this.attachmentsRepository.create({
        ...details,
      });
      return await this.attachmentsRepository.save(conference);
    } catch (error) {
      throw new Error(
        `Закрепленный объект не был создан. Ошибка ${String(error)}`,
      );
    }
  }
}
