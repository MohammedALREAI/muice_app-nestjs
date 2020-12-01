import { IsString, IsDefined } from 'class-validator';
import { Gender, ArtistType } from '../../../commons/enums/index.Enum';
export class CreateNewSingerDto {
  @IsString()
  @IsDefined()
  nationality: string
  @IsString()
  @IsDefined()
  name: string
  @IsString()
  @IsDefined()
  info: string

  gender: Gender

  type: ArtistType

}
