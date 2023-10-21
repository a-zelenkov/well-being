import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Attachment } from 'src/database/attachment.entity';
/**
 * Модель DTO для создания данных
 */
export class CreateAttachmentDto {
  constructor(attachment: Attachment) {
    this.id = attachment.id;
    this.conferenceId = attachment.conferenceId;
    this.content = attachment.content;
  }
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  conferenceId: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  type: number;
}

export class OutputAttachmentDto {
  constructor(attachment: Attachment) {
    this.id = attachment.id;
    this.content = attachment.content;
    this.conferenceId = attachment.conferenceId;
  }
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  conferenceId: number;

  @IsNumber()
  @IsNotEmpty()
  type: number;
}
