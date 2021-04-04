import { PartialType } from '@nestjs/mapped-types';
import { MusicType } from '../../../commons/enums/index.Enum';
import { IsString, IsDefined, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMusicAlBoomsDto {
  @ApiProperty({
    name: 'musicianAlbumId',
    description: ' musicianAlbumId',
    type: Number,
  })
  @IsNumber()
  @IsDefined()
  musicianAlbumId: number;

  @ApiProperty({
    name: 'name',
    description: ' name of musicianAlbumId',
    type: String,
  })
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty({
    name: 'description',
    description: ' description musicianAlbumId',
    type: String,
  })
  @IsString()
  @IsDefined()
  description: string;

  @ApiProperty({
    name: 'artist',
    description: ' artist of musicianAlbumId',
    type: String,
  })
  @IsString()
  @IsDefined()
  artist: string;

  @ApiProperty({
    name: 'type',
    description: ' name of musicianAlbumId',
    enum: MusicType,
    enumName: 'MusicType',
  })
  type: MusicType;
}
export class UpdateMusicAlBoomsDto extends PartialType(CreateMusicAlBoomsDto) {}
