import { Gender, ArtistType } from '../../../commons/enums/index.Enum';
import { IsEnum, IsString, IsDefined } from 'class-validator';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNewMusician {
  @ApiProperty({
    name: 'name',
    description: ' name of Musions',
    type: 'string',
  })
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty({
    name: 'info',
    description: ' info of Musions',
    type: 'string',
  })
  @IsString()
  @IsDefined()
  info: string;

  @ApiProperty({
    name: 'gender',
    description: ' gender of Musions',
    enum: Gender,
  })
  @IsEnum(Gender, { each: false })
  gender: Gender;

  @IsEnum(ArtistType, { each: false })
  @ApiProperty()
  type: ArtistType;

  @IsString()
  @IsDefined()
  @ApiProperty({
    name: 'nationality',
    description: ' info of Musions',
    type: 'string',
  })
  nationality: string;
}

export class CreateNewMusicianParams extends PickType(CreateNewMusician, [
  'name',
  'nationality',
  'info',
  'type',
  'gender',
]) {}

export class UpdateNewMusician extends PartialType(CreateNewMusician) {}
