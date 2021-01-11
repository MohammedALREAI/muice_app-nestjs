import { SongType, SongLanguage } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNewSongDto {
  @ApiProperty()
  singerAlbumId: number
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
  @ApiProperty()
  source: any
}
