import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    return user;
  }

  async createUser(details: CreateUserDto) {
    try {
      const user = this.usersRepository.create({
        ...details,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error(`Пользователь не был создан. Ошибка ${String(error)}`);
    }
  }

  async updateUser(details: UpdateUserDto) {
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

  async deleteUser(id: number) {
    try {
      const user = await this.getById(id);
      user.isDeleted = true;
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error(`Пользователь не был удален. Ошибка ${String(error)}`);
    }
  }
}
