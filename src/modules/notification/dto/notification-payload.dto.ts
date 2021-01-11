import { ApiProperty } from '@nestjs/swagger';
export class NotificationPayloadDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  body: string;
}
