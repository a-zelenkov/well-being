import { Exclude } from 'class-transformer';
import {
  BaseEntity as BaseOrmEntity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'Id',
  })
  id: number;

  @Exclude()
  @Column({
    type: 'boolean',
    nullable: true,
    name: 'IsDeleted',
    select: false,
  })
  isDeleted: boolean;
}
