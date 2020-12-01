import { SongType, SongLanguage } from '../../../commons/enums/index.Enum';
export class CreateNewSongDto {
  singerAlbumId: number
  name: string
  description: string
  artist: string
  type: SongType
  language: SongLanguage
  source: any
}
