import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'Gmail',
    unique: true,
  })
  gmail: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'Info',
  })
  info: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
    name: 'Role',
  })
  role: number;
}
