import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/database/user.entity';

/**
 * Модель DTO для создания данных
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  role: number;
}

/**
 * Модель DTO для данных на обновление
 */
export class UpdateUserDto {
  constructor() {}
  static from(user: any) {
    const object = new UpdateUserDto();
    object.email = user.email;
    object.info = user.info;
    // this.role = user.role;
    object.picture = user.picture;
    object.name = user.name;
    return object;
  }

  @IsString()
  info: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  picture: string;

  @IsString()
  name: string;

  // @IsNumber()
  // role: number;
}

/**
 * Модель DTO для данных на выход
 */
export class OutputUserDto {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.info = user.info;
    this.role = user.role;
    this.picture = user.picture;
    this.name = user.name;
  }
  id: number;
  email: string;
  info: string;
  role: number;
  picture: string;
  name: string;
}
