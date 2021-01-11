import { ArtistType, Gender } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';
export class GetFilteredSingers {
  @ApiProperty()
  limit: number
  @ApiProperty()
  nationality: string
  @ApiProperty()
  type: ArtistType
  @ApiProperty()
  gender: Gender
}
