import { SongType, SongLanguage } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';
export class GetFilteredSongDto {
  @ApiProperty()
  limit: number
  @ApiProperty()
  type: SongType
  @ApiProperty()
  language: SongLanguage
  @ApiProperty()
  rate: number
}
