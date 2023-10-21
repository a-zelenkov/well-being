import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @Column({
    type: 'int',
    nullable: false,
    name: 'ConferenceId',
  })
  conferenceId: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'Text',
  })
  text: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'SenderId',
  })
  senderId: number;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'CreatedAt',
  })
  createdAt: Date;

  @Column({
    type: 'int',
    nullable: false,
    name: 'Type',
  })
  type: number;
}
