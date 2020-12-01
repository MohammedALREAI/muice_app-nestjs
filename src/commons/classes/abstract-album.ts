import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsDefined, IsString } from 'class-validator'
export abstract class AbstractAlbum extends BaseEntity {
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
  image: string;


}
