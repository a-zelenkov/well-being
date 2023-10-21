import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Attachment } from 'src/database/attachment.entity';
import { Audience } from 'src/database/audience.entity';
import { Conference } from 'src/database/conference.entity';
import { OutputAudienceDto } from './audience.dto';
import { OutputCommentDto } from './comment.dto';
import { CreateAttachmentDto, OutputAttachmentDto } from './attachment.dto';
import { Comment } from 'src/database/comment.entity';

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

  attachment: CreateAttachmentDto[];
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
  constructor(
    conference: Conference,
    attachment: Attachment[],
    comments: Comment[],
    audience: Audience[],
  ) {
    this.id = conference.id;
    this.expertId = conference.expertId;
    this.directionId = conference.directionId;
    this.startsAt = conference.startsAt;
    this.description = conference.description;
    this.name = conference.name;
    this.audience = audience.map((audience) => new OutputAudienceDto(audience));
    this.comments = comments.map((comment) => new OutputCommentDto(comment));
    this.attachment = attachment.map(
      (attachment) => new OutputAttachmentDto(attachment),
    );
  }

  id: number;
  name: string;
  expertId: number;
  directionId: number;
  startsAt: Date;
  description: string;
  audience: OutputAudienceDto[];
  attachment: OutputAttachmentDto[];
  comments: OutputCommentDto[];
}
