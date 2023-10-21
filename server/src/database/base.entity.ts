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
    nullable: true,
    name: 'IsDeleted',
  })
  isDeleted: boolean;
}
