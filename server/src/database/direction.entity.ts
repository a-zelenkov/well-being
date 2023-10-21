import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'directions' })
export class Direction extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'Name',
  })
  name: string;
}
