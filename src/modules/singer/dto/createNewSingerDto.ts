import { IsString, IsDefined } from 'class-validator';
import { Gender, ArtistType } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNewSingerDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  nationality: string
  @IsString()
  @IsDefined()
  @ApiProperty()
  name: string
  @IsString()
  @IsDefined()
  @ApiProperty()
  info: string

  @ApiProperty()
  gender: Gender

  @ApiProperty()
  type: ArtistType

}
