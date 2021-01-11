import { ArtistType, Gender } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateSingerDto {
  @ApiProperty()
  
  id: number
  @ApiProperty()
  
  name: string
  @ApiProperty()
  
  info: string
  @ApiProperty()
  
  gender: Gender
  @ApiProperty()
  
  nationality: string
  @ApiProperty()
  
  type: ArtistType
  @ApiProperty()
  
  image: any
}
