import { SongType, SongLanguage } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class GetQueryFilteredSongDto {
  @ApiProperty({ name: 'limit', description: 'the limit ', type: Number })
  limit: number;
  @ApiProperty({ enum: SongType, description: 'the limit ', type: SongType })
  type: SongType;
  @ApiProperty({
    enum: SongLanguage,
    description: 'the SongLanguage ',
    type: SongType,
  })
  language: SongLanguage;
  @ApiProperty({ name: 'rate', description: 'the limit ', type: Number })
  @IsNumber()
  rate: number;
}
