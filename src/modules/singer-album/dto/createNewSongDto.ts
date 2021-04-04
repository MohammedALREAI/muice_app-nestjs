import { SongType, SongLanguage } from '../../../commons/enums/index.Enum';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateNewSongDto {
  @ApiProperty({
    name: 'singerAlbumId',
    description: ' name of Musions',
    type: String,
  })
  singerAlbumId: number;

  @ApiProperty({ name: 'name', description: ' name of Musions', type: String })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'description',
    description: ' description',
    type: String,
  })
  @IsString()
  description: string;
  @ApiProperty({ name: 'artist', description: ' artist', type: String })
  @IsString()
  artist: string;

  @ApiProperty({
    enumName: 'type',
    description: ' name of Musions',
    enum: SongType,
  })
  type: SongType;

  @ApiProperty({
    enumName: 'language',
    description: ' name of Musions',
    enum: SongLanguage,
  })
  language: SongLanguage;
}

export class UpdateNewSongDto extends PartialType(CreateNewSongDto) {}
