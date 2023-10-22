import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/database/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from 'src/dto/comment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}
  async getByConferenceId(id: number) {
    const comments = await this.commentsRepository.find({
      where: { conferenceId: id, isDeleted: !true },
    });
    return comments;
  }

  async getById(id: number) {
    const comments = await this.commentsRepository.findOne({
      where: { id, isDeleted: !true },
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

  async update(details: UpdateCommentDto) {
    try {
      const comment = await this.getById(details.id);

      return await this.commentsRepository.save({
        ...comment,
        ...details,
      });
    } catch (error) {
      throw new Error(`Комментарий не был обновлен. Ошибка ${String(error)}`);
    }
  }

  async delete(id: number) {
    const comment = await this.getById(id);
    comment.isDeleted = true;

    return await this.commentsRepository.save(comment);
  }
}
