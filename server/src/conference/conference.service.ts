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

  async getAll() {
    return await this.conferencesRepository.find({
      where: { isDeleted: !true },
    });
  }

  async getById(id: number) {
    const conference = await this.conferencesRepository.findOne({
      where: { id, isDeleted: !true },
    });
    return conference;
  }

  async get(startsAt: Date) {
    const conferences = await this.conferencesRepository.find({
      where: {
        startsAt: Between(startsAt, new Date()),
        isDeleted: !true,
      },
    });
    return conferences;
  }

  async create(details: CreateConferenceDto) {
    try {
      const conference = this.conferencesRepository.create({
        ...details,
      });
      return await this.conferencesRepository.save(conference);
    } catch (error) {
      throw new Error(`Пользователь не был создан. Ошибка ${String(error)}`);
    }
  }

  async update(details: UpdateConferenceDto) {
    try {
      const conference = await this.getById(details.id);

      return await this.conferencesRepository.save({
        ...conference,
        ...details,
      });
    } catch (error) {
      throw new Error(`Пользователь не был обновлен. Ошибка ${String(error)}`);
    }
  }

  async delete(id: number) {
    try {
      const conference = await this.getById(id);
      conference.isDeleted = true;
      return await this.conferencesRepository.save(conference);
    } catch (error) {
      throw new Error(`Пользователь не был удален. Ошибка ${String(error)}`);
    }
  }
}
