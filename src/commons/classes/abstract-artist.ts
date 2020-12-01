import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, ArtistType } from '../enums/index.Enum';
import { IsNumber, IsDefined, IsString, IsEnum } from 'class-validator';
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

  @IsEnum(ArtistType, { each: false })
  @Column({
    type: 'enum',
    enum: ArtistType,
    array: false,
  })
  type: ArtistType;

  @IsEnum(Gender, { each: false })

  @Column({
    type: 'enum',
    enum: Gender,
    array: false,
  })
  gender: Gender;

  @Column()
  @IsString()
  @IsDefined()
  nationality: string;

}
