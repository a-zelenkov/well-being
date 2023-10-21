import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'attachments' })
export class Audience extends BaseEntity {
  @Column({
    type: 'int',
    nullable: false,
    name: 'ConferenceId',
  })
  conferenceId: number;
  @Column({
    type: 'int',
    nullable: false,
    name: 'UserId',
  })
  userId: number;
}
