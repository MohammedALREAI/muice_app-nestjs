import { IsString, IsDefined } from 'class-validator';
import { Gender } from '../../../commons/enums/gender.enum';
import { ArtistType } from '../../../commons/enums/artist-type.enum';
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
