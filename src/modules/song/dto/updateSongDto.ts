import { SongType, SongLanguage } from '../../../commons/enums/index.Enum';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSongDto {
  @ApiProperty({
    name: 'name',
    required: true,
    description: 'name',
    type: String,
  })
  @IsString()
  name: string;
  @ApiProperty({
    name: 'description',
    required: true,
    description: 'name',
    type: String,
  })
  @IsString()
  description: string;
  @ApiProperty({
    name: 'artist',
    required: true,
    description: 'artist',
    type: String,
  })
  @IsString()
  artist: string;
  @ApiProperty({
    required: true,
    description: 'name',
    enum: SongType,
    type: SongType,
  })
  type: SongType;
  @ApiProperty({
    required: true,
    description: 'language',
    type: SongLanguage,
    enum: SongLanguage,
  })
  language: SongLanguage;
}

export class UpdateSongDto extends PartialType(CreateSongDto) {}
