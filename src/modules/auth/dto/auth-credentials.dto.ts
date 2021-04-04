import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    name: 'username',
    required: true,
    description: 'please enter user name ',
  })
  @IsString()
  readonly username: string;
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
