import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'attachments' })
export class Attachment extends BaseEntity {
  @Column({
    type: 'int',
    nullable: false,
    name: 'ConferenceId',
  })
  conferenceId: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'Content',
  })
  content: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'Type',
  })
  type: number;
}
