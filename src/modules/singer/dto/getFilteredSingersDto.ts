import { ArtistType, Gender } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class GetQuerySingers {
  @ApiProperty({ name: 'limit', description: 'the limit ', type: Number })
  @IsNumber()
  limit: number;
  @ApiProperty({
    name: 'nationality',
    description: 'the nationality ',
    type: String,
  })
  @IsString()
  nationality: string;
  @ApiProperty({
    name: 'type',
    description: 'the type ',
    enum: ArtistType,
    enumName: 'ArtistType',
  })
  type: ArtistType;
  @ApiProperty({
    name: 'gender',
    description: 'the gender ',
    enum: Gender,
    enumName: 'gender',
  })
  gender: Gender;
}
