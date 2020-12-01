import { SongType, SongLanguage } from '../../../commons/enums/index.Enum';
export class GetFilteredSongDto {
  limit: number
  type: SongType
  language: SongLanguage
  rate: number
}
