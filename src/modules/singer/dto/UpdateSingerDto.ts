import { ArtistType, Gender } from '../../../commons/enums/index.Enum';
export class UpdateSingerDto {
  id: number
  name: string
  info: string
  gender: Gender
  nationality: string

  type: ArtistType
  image: any
}
