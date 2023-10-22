import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, OutputUserDto, UpdateUserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getProfile(@Req() req) {
    try {
      return this.userService.getById(req.user.id);
    } catch (ex) {
      return { error: ex };
    }
  }

  @Get('getAll')
  async getAll() {
    return (await this.userService.getAll()).map(
      (user) => new OutputUserDto(user),
    );
  }

  @Put()
  async update(@Body() userModel: UpdateUserDto) {
    try {
      return new OutputUserDto(await this.userService.update(userModel));
    } catch (Ex) {
      return { error: Ex };
    }
  }

  @Post()
  async create(@Body() userModel: CreateUserDto) {
    try {
      return new OutputUserDto(await this.userService.create(userModel));
    } catch (Ex) {
      return { error: Ex };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.userService.delete(id);

      return {
        msg: true,
      };
    } catch (Ex) {
      return { error: Ex };
    }
  }
}
