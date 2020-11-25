import { Gender } from '../../../commons/enums/gender.enum';
import { ArtistType } from '../../../commons/enums/artist-type.enum';
export class UpdateSingerDto {
  id: number
  name: string
  info: string
  gender: Gender
  nationality: string

  type: ArtistType
  image: any
}
