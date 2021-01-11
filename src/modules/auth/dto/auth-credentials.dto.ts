import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty()

  username: string;
  @ApiProperty()

  email: string;
  @ApiProperty()

  password: string;
}
