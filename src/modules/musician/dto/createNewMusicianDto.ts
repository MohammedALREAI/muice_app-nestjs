import { Gender, ArtistType } from '../../../commons/enums/index.Enum';
import { IsEnum, IsString, IsDefined } from 'class-validator';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNewMusician {

  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string

  @ApiProperty()
  @IsString()
  @IsDefined()

  @ApiProperty()
  info: string
  @IsEnum(Gender, { each: false })
  @ApiProperty()
  gender: Gender
  @IsEnum(ArtistType, { each: false })


  @ApiProperty()
  type: ArtistType
  @IsString()
  @IsDefined()

  @ApiProperty()
  nationality: string
  @IsDefined()

  @ApiProperty()
  image: any
}



export class CreateNewMusicianParams extends PickType(CreateNewMusician, ['name', 'nationality', 'info', 'type', 'gender']) {
}

export class UpdateNewMusician extends PartialType(CreateNewMusician) { }
