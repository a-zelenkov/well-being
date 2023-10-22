import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find({ where: { isDeleted: !true } });
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id, isDeleted: !true },
    });
    console.log(user);
    if (user.isDeleted) return null;
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email, isDeleted: !true },
    });
    console.log(user);
    if (user.isDeleted) return null;
    return user;
  }

  async create(details: CreateUserDto) {
    try {
      const user = this.usersRepository.create({
        ...details,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error(`Пользователь не был создан. Ошибка ${String(error)}`);
    }
  }

  async update(details: UpdateUserDto) {
    try {
      const user = await this.getByEmail(details.email);
      return await this.usersRepository.save({
        ...user,
        ...details,
      });
    } catch (error) {
      throw new Error(`Пользователь не был обновлен. Ошибка ${String(error)}`);
    }
  }

  async updateById(userId: number, details: UpdateUserDto) {
    try {
      const user = await this.getById(userId);
      return await this.usersRepository.save({
        ...user,
        ...details,
      });
    } catch (error) {
      throw new Error(`Пользователь не был обновлен. Ошибка ${String(error)}`);
    }
  }

  async delete(id: number) {
    try {
      const user = await this.getById(id);
      user.isDeleted = true;
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error(`Пользователь не был удален. Ошибка ${String(error)}`);
    }
  }
}
