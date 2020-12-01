import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, ArtistType } from '../enums/index.Enum';
import { IsNumber, IsDefined, IsString } from 'class-validator';
export abstract class AbstractArtist extends BaseEntity {
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
  info: string;

  @Column()
  @IsString()
  @IsDefined()
  image: string;

  @Column({
    type: 'enum',
    enum: ArtistType,
    array: false
  })
  type: ArtistType;

  @Column({
    nullable: true
  })
  gender: Gender;

  @Column()
  @IsString()
  @IsDefined()
  nationality: string;

}
