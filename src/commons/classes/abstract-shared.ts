import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class Shared extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
