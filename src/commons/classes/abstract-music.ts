import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsDefined, IsNumber } from 'class-validator';

export abstract class AbstractMusic extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsDefined()
  id: number;

  @Column()
  @IsString()
  @IsDefined()
  name: string;

  @Column()
  @IsString()
  @IsDefined()
  description: string;

  @Column()
  @IsString()
  @IsDefined()
  artist: string;

  @Column({
    default: 0
  })
  rate: number;

  @Column()
  @IsString()
  @IsDefined() source: string;

  @CreateDateColumn({ type: "date" })
  publishedIn: Date;

  @Column()
  @IsString()
  @IsDefined()
  tempImage: string;
}
