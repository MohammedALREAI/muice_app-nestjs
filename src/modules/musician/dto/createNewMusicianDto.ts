import { Gender, ArtistType } from '../../../commons/enums/index.Enum';
import { IsEnum, IsString, IsDefined } from 'class-validator';
import { PartialType, PickType } from '@nestjs/mapped-types';
export class CreateNewMusician {

  @IsString()
  @IsDefined()
  name: string
  @IsString()
  @IsDefined()
  info: string
  @IsEnum(Gender, { each: false })

  gender: Gender
  @IsEnum(ArtistType, { each: false })

  type: ArtistType
  @IsString()
  @IsDefined()
  nationality: string
  @IsDefined()
  image: any
}



export class CreateNewMusicianParams extends PickType(CreateNewMusician, ['name', 'nationality', 'info', 'type', 'gender']) {
}

export class UpdateNewMusician extends PartialType(CreateNewMusician) { }
