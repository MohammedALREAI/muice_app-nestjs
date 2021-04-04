import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PlaylistDto {
  @ApiProperty({ name: 'name', description: ' name of PlaylistDto' })
  @IsString()
  name: string;
}

export class UpdatePlayListDto extends PartialType(PlaylistDto) {}
