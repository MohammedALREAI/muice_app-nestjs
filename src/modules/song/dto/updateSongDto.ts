
import { Song } from '../song.entity';
import { SongType } from '../../../commons/enums/song-type.enum';
import { SongLanguage } from '../../../commons/enums/song-language.enum';



export type updateSongType = Pick<Song, "id" | "name" | "description" | "artist" | "type" | "language" | "source">



export class UpdateSongDto {



  name: string
  description: string
  artist: string
  type: SongType
  language: SongLanguage
}
