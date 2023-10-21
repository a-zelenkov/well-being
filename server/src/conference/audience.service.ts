import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Audience } from 'src/database/audience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AudienceService {
  constructor(
    @InjectRepository(Audience)
    private readonly audienceRepository: Repository<Audience>,
  ) {}

  async getSubscribesConference(conferenceId: number) {
    try {
      const users = await this.audienceRepository.find({
        where: { conferenceId },
      });
      return users;
    } catch (error) {
      throw new Error(
        `Не удалось получить подписчиков конференции. Ошибка ${String(error)}`,
      );
    }
  }
  async getConferencesUser(userId: number) {
    try {
      const users = await this.audienceRepository.find({
        where: { userId },
      });
      return users;
    } catch (error) {
      throw new Error(
        `Не удалось получить конференции на которые подписан пользователь. Ошибка ${String(
          error,
        )}`,
      );
    }
  }

  async subsribeUser(userId: number, conferenceId: number) {
    try {
      const userConference = this.audienceRepository.create({
        userId: userId,
        conferenceId: conferenceId,
      });
      return await this.audienceRepository.save(userConference);
    } catch (error) {
      throw new Error(
        `Подписка на событие не была создана. Ошибка ${String(error)}`,
      );
    }
  }

  async unSubsribeUser(userId: number, conferenceId: number) {
    try {
      const userConference = await this.audienceRepository.findOne({
        where: {
          userId,
          conferenceId,
        },
      });
      userConference.isDeleted = true;
      const usersConferences = await this.audienceRepository.find({
        where: {
          conferenceId,
        },
      });
      return usersConferences;
    } catch (error) {
      throw new Error(`Отписка от события не удалась. Ошибка ${String(error)}`);
    }
  }
}
