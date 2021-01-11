
import { Song } from '../song.entity';
import { SongType, SongLanguage } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';



export type updateSongType = Pick<Song, "id" | "name" | "description" | "artist" | "type" | "language" | "source">



export class UpdateSongDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
  @ApiProperty()
  artist: string
  @ApiProperty()
  type: SongType
  @ApiProperty()
  language: SongLanguage
}
