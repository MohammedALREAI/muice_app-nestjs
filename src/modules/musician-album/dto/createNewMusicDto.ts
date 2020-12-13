import { MusicType } from '../../../commons/enums/index.Enum';
import { IsString, IsDefined, IsNumber } from 'class-validator';
export class CreateMusicDto {
  @IsNumber()
  @IsDefined()
  musicianAlbumId: number
  @IsString()
  @IsDefined()
  name: string
  @IsString()
  @IsDefined()
  description: string
  @IsString()
  @IsDefined()
  artist: string
  type: MusicType
  source: any

}
