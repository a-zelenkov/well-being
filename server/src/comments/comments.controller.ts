import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  CreateCommentDto,
  OutputCommentDto,
  UpdateCommentDto,
} from 'src/dto/comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  async create(@Res() res, @Body() details: CreateCommentDto) {
    try {
      details.senderId = res.user.id;
      const comment = await this.commentService.create(details);

      return new OutputCommentDto(comment);
    } catch (ex) {
      return { error: ex };
    }
  }

  @Put()
  async update(@Body() details: UpdateCommentDto) {
    try {
      const comment = await this.commentService.update(details);

      return new OutputCommentDto(comment);
    } catch (ex) {
      return { error: ex };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.commentService.delete(id);
      return {
        msg: true,
      };
    } catch (ex) {
      return { error: ex };
    }
  }
}
