import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
export class UpdateUserDto extends CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

/**
 * Модель DTO для данных на выход
 */
export class OutputUserDto {
  id: number;
  login: string;
}
