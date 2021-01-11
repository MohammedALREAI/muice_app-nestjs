import { IsDefined, IsString } from 'class-validator';
import { MusicType } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMusicDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  description: string
  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string
  @ApiProperty()
  @IsString()
  @IsDefined()
  artist: string
  type: MusicType

}
