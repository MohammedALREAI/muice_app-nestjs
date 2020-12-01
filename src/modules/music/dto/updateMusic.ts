import { IsDefined, IsString } from 'class-validator';
import { MusicType } from '../../../commons/enums/index.Enum';

export class UpdateMusicDto {
  @IsString()
  @IsDefined()
  description: string
  @IsString()
  @IsDefined()
  name: string
  @IsString()
  @IsDefined()
  artist: string
  type: MusicType

}
