import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsDefined } from 'class-validator';
import { Gender, ArtistType } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNewSingerDto {
  @ApiProperty({
    name: 'nationality',
    required: true,
    description: 'firstName enter for user',
  })
  @IsString()
  @IsDefined()
  nationality: string;
  @IsString()
  @IsDefined()
  @ApiProperty({
    name: 'name',
    required: true,
    description: 'firstName enter for user',
  })
  name: string;
  @IsString()
  @IsDefined()
  @ApiProperty({
    name: 'info',
    required: true,
    description: 'firstName enter for user',
  })
  info: string;

  @ApiProperty({
    name: 'gender',
    required: true,
    description: 'firstName enter for user',
    enum: Gender,
    enumName: 'Gender',
  })
  gender: Gender;

  @ApiProperty({
    name: 'type',
    required: true,
    description: 'firstName enter for user',
    enum: ArtistType,
    enumName: 'ArtistType',
  })
  type: ArtistType;
}

export class UpdateNewSingerDto extends PartialType(CreateNewSingerDto) {}
