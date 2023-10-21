import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'Email',
    unique: true,
  })
  email: string;

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

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'Picture',
  })
  picture: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'Name',
  })
  name: string;
}
