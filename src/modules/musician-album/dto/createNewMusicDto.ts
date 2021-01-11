import { MusicType } from '../../../commons/enums/index.Enum';
import { IsString, IsDefined, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMusicDto {
  @ApiProperty()

  @IsNumber()
  @IsDefined()
  musicianAlbumId: number
  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string
  @IsString()
  @IsDefined()
  @ApiProperty()
  description: string
  @IsString()
  @IsDefined()
  @ApiProperty()
  artist: string
  @ApiProperty()
  type: MusicType
  @ApiProperty()
  source: any

}
