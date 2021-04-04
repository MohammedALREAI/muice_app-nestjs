import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class NotificationPayloadDto {
  @ApiProperty({
    name: 'title',
    description: 'please enter title ',
    type: String,
  })
  @IsString()
  title: string;
  @ApiProperty({ name: 'body', description: 'body ', type: String })
  @IsString()
  body: string;
}
