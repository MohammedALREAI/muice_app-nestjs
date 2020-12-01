import { ArtistType, Gender } from '../../../commons/enums/index.Enum';
export class GetFilteredSingers {
  limit: number
  nationality: string
  type: ArtistType
  gender: Gender
}
