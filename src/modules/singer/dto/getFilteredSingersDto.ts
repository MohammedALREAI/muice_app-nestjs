import { ArtistType } from '../../../commons/enums/artist-type.enum';
import { Gender } from '../../../commons/enums/gender.enum';
export class GetFilteredSingers {
  limit: number
  nationality: string
  type: ArtistType
  gender: Gender
}
