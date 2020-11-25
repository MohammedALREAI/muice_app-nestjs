import { SongType } from '../../../commons/enums/song-type.enum';
import { SongLanguage } from '../../../commons/enums/song-language.enum';
export class CreateNewSongDto {
  singerAlbumId: number
  name: string
  description: string
  artist: string
  type: SongType
  language: SongLanguage
  source: any
}
