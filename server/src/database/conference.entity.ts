import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'conferences' })
export class Conference extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'Name',
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'ExpertId',
  })
  expertId: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'DirectionId',
  })
  directionId: number;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'StartsAt',
  })
  startsAt: Date;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'Description',
  })
  description: string;
}
