import { IsNotEmpty, IsNumber } from 'class-validator';
import { Audience } from 'src/database/audience.entity';

export class OutputAudienceDto {
  constructor(audience: Audience) {
    this.id = audience.id;
    this.userId = audience.userId;
    this.conferenceId = audience.conferenceId;
  }
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  conferenceId: number;
}
