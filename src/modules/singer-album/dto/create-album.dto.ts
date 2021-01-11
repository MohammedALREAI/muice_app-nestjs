import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  name: string;
}
