import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Comment } from 'src/database/comment.entity';
/**
 * Модель DTO для создания данных
 */
export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsNumber()
  @IsNotEmpty()
  conferenceId: number;
}

export class UpdateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class OutputCommentDto {
  constructor(comment: Comment) {
    this.id = comment.id;
    this.senderId = comment.senderId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
    this.type = comment.type;
    this.conferenceId = comment.conferenceId;
  }
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsNumber()
  @IsNotEmpty()
  conferenceId: number;
}
