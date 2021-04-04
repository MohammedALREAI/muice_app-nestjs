import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    name: 'name',
    description: ' name of Musions',
    type: 'string',
  })
  name: string;
}
export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
