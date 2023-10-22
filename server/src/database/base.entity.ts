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

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
    name: 'IsDeleted',
  })
  isDeleted: boolean;
}
