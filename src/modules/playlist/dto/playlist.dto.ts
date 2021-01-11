import { ApiProperty } from "@nestjs/swagger";

export class PlaylistDto {
  @ApiProperty()
  name: string;
}
