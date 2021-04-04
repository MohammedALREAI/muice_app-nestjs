import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class EmailLoginDto {
  @ApiProperty({
    name: 'email',
    required: true,
    description: 'please enter user email ',
  })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    name: 'email',
    required: true,
    description: 'please enter user email ',
  })
  @IsString()
  readonly password: string;
}
