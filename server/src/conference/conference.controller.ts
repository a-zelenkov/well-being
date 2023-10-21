import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ConferenceService } from './conference.service';
import {
  CreateConferenceDto,
  OutputConferenceDto,
  UpdateConferenceDto,
} from 'src/dto/conference.dto';
import { CommentsService } from 'src/comments/comments.service';
import { AttachmentService } from 'src/attachment/attachment.service';
import { AudienceService } from './audience.service';

import { Attachment } from 'src/database/attachment.entity';

@Controller('conference')
export class ConferenceController {
  constructor(
    private readonly conferenceService: ConferenceService,
    private readonly commentService: CommentsService,
    private readonly attachmentService: AttachmentService,
    private readonly audienceService: AudienceService,
  ) {}

  @Get(':id')
  async getConferences(@Param('id') id: number) {
    try {
      const conference = await this.conferenceService.getById(id);
      const comment = await this.commentService.getByConferenceId(
        conference.id,
      );
      const attachment = await this.attachmentService.getByConferenceId(
        conference.id,
      );
      const audience = await this.audienceService.getSubscribesConference(
        conference.id,
      );

      return new OutputConferenceDto(conference, attachment, comment, audience);
    } catch (ex) {
      return { error: ex };
    }
  }

  @Get('/getall')
  async getAll() {
    try {
      const conferences = (await this.conferenceService.getAll()).map(
        (it) => new OutputConferenceDto(it, null, null, null),
      );
      return conferences;
      // Зачем то я билдил модель со всеми полями полтора часа в 2 ночи воскресенье
      // for (let j = 0; j < rawConference.length; j++) {
      //   const rawAttachments = await this.attachmentService.getByConferenceId(
      //     rawConference[j].id,
      //   );
      //   const attachments: Attachment[] = [];
      //   for (let i = 0; i < rawAttachments.length; j++) {
      //     attachments.push(rawAttachments[i]);
      //   }

      //   const rawComments = await this.commentService.getByConferenceId(
      //     rawConference[j].id,
      //   );
      //   const comments: Comment[] = [];
      //   for (let i = 0; i < rawAttachments.length; j++) {
      //     comments.push(rawComments[i]);
      //   }

      //   const rawAudience = await this.audienceService.getSubscribesConference(
      //     rawConference[j].id,
      //   );
      //   const audience: Audience[] = [];
      //   for (let i = 0; i < rawAttachments.length; j++) {
      //     audience.push(rawAudience[i]);
      //   }

      //   conferences.push(
      //     new OutputConferenceDto(
      //       rawConference[j],
      //       attachments,
      //       comments,
      //       audience,
      //     ),
      //   );
      // }
    } catch (ex) {
      return { error: ex };
    }
  }

  @Get()
  async get(@Body() date: string) {
    try {
      const conferences = (
        await this.conferenceService.get(new Date(date))
      ).map((it) => new OutputConferenceDto(it, null, null, null));

      return conferences;
    } catch (ex) {
      return { error: ex };
    }
  }

  @Post()
  async create(@Body() details: CreateConferenceDto) {
    try {
      const conference = await this.conferenceService.create(details);
      const attachments: Attachment[] = [];
      for (let j = 0; j < details.attachment.length; j++) {
        attachments.push(
          await this.attachmentService.create(details.attachment[j]),
        );
      }

      return new OutputConferenceDto(conference, attachments, null, null);
    } catch (ex) {
      return { error: ex };
    }
  }

  @Put()
  async update(@Body() details: UpdateConferenceDto) {
    try {
      return await this.conferenceService.update(details);
    } catch (ex) {
      return { error: ex };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.conferenceService.delete(id);
    } catch (ex) {
      return { error: ex };
    }
  }

  @Post('/subscribe')
  async subcribe(@Res() res, @Body() conferenceId: number) {
    try {
      await this.audienceService.subsribeUser(res.user.id, conferenceId);
      return { msg: true };
    } catch (ex) {
      return { error: ex, msg: false };
    }
  }

  @Delete('/unsubscribe')
  async unSubscribe(@Res() res, @Body() conferenceId: number) {
    try {
      await this.audienceService.unSubsribeUser(res.user.id, conferenceId);
      return { msg: true };
    } catch (ex) {
      return { error: ex, msg: false };
    }
  }

  @Get('/getAudience')
  async getSubcribesConference(@Res() res, @Body() conferenceId: number) {
    try {
      return await this.audienceService.getSubscribesConference(conferenceId);
    } catch (ex) {
      return { error: ex, msg: false };
    }
  }

  @Get('/getByUser')
  async getConferencesUser(@Res() res) {
    try {
      return await this.audienceService.getSubscribesConference(res.user.id);
    } catch (ex) {
      return { error: ex, msg: false };
    }
  }
}
