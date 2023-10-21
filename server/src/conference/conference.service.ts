import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conference } from 'src/database/conference.entity';
import {
  CreateConferenceDto,
  UpdateConferenceDto,
} from 'src/dto/conference.dto';
import { Between, Repository } from 'typeorm';

@Injectable()
export class ConferenceService {
  constructor(
    @InjectRepository(Conference)
    private readonly conferencesRepository: Repository<Conference>,
  ) {}

  async getAll(): Promise<Conference[]> {
    return this.conferencesRepository.find();
  }

  async getById(id: number) {
    const conference = await this.conferencesRepository.findOne({
      where: { id },
    });
    return conference;
  }

  async get(startsAt: Date) {
    const conferences = await this.conferencesRepository.find({
      where: { startsAt: Between(startsAt, new Date()) },
    });
    return conferences;
  }

  async createUser(details: CreateConferenceDto) {
    try {
      const user = this.conferencesRepository.create({
        ...details,
      });
      return await this.conferencesRepository.save(user);
    } catch (error) {
      throw new Error(`Пользователь не был создан. Ошибка ${String(error)}`);
    }
  }

  async updateUser(details: UpdateConferenceDto) {
    try {
      const user = await this.getById(details.id);

      return await this.conferencesRepository.save({
        ...user,
        ...details,
      });
    } catch (error) {
      throw new Error(`Пользователь не был обновлен. Ошибка ${String(error)}`);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.getById(id);
      user.isDeleted = true;
      return await this.conferencesRepository.save(user);
    } catch (error) {
      throw new Error(`Пользователь не был удален. Ошибка ${String(error)}`);
    }
  }
}
