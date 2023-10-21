import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Conference } from 'src/database/conference.entity';

/**
 * Модель DTO для создания данных
 */
export class CreateConferenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  expertId: number;

  @IsNumber()
  directionId: number;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => Date.parse(value))
  startsAt: Date;

  @IsNumber()
  description: string;
}

/**
 * Модель DTO для данных на обновление
 */
export class UpdateConferenceDto extends CreateConferenceDto {
  @IsString()
  @IsNotEmpty()
  id: number;
}

/**
 * Модель DTO для данных на выход
 */
export class OutputConferenceDto {
  constructor(conference: Conference) {
    this.id = conference.id;
    this.expertId = conference.expertId;
    this.directionId = conference.directionId;
    this.startsAt = conference.startsAt;
    this.description = conference.description;
    this.name = conference.name;
  }
  id: number;
  name: string;
  expertId: number;
  directionId: number;
  startsAt: Date;
  description: string;
}
