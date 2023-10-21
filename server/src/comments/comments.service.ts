import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/database/comment.entity';
import { CreateCommentDto } from 'src/dto/comment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}
  async getByConferenceId(id: number) {
    const comments = await this.commentsRepository.find({
      where: { conferenceId: id, isDeleted: false },
    });
    return comments;
  }

  async create(details: CreateCommentDto) {
    try {
      const conference = this.commentsRepository.create({
        ...details,
      });
      return await this.commentsRepository.save(conference);
    } catch (error) {
      throw new Error(`Комментарий не был создан. Ошибка ${String(error)}`);
    }
  }

  async update(id: number) {
    const comments = await this.commentsRepository.find({
      where: { id },
    });
    return comments;
  }

  async delete(id: number) {
    const comments = await this.commentsRepository.find({
      where: { conferenceId: id },
    });
    return comments;
  }
}
