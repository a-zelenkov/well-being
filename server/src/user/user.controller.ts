import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getProfile(@Req() req) {
    // Tremba todo: Сделать нормальный вывод пользователя. В данный момент выводится вся инфа из бд
    return req.user;
  }

  @Post()
  async create(@Body() userModel: CreateUserDto) {
    return this.userService.createUser(userModel);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
