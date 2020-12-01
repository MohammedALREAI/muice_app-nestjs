
import { Song } from '../song.entity';
import { SongType, SongLanguage } from '../../../commons/enums/index.Enum';



export type updateSongType = Pick<Song, "id" | "name" | "description" | "artist" | "type" | "language" | "source">



export class UpdateSongDto {



  name: string
  description: string
  artist: string
  type: SongType
  language: SongLanguage
}
