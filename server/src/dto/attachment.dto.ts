import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Attachment } from 'src/database/attachment.entity';
/**
 * Модель DTO для создания данных
 */
export class CreateAttachmentDto {
  constructor() {}

  static from(attachment: Attachment) {
    const obj = new CreateAttachmentDto();
    obj.conferenceId = attachment.conferenceId;
    obj.content = attachment.content;
    obj.type = attachment.type;
    return obj;
  }

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
