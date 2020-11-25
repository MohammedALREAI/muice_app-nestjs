import { IsDefined, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsDefined()
  username: string;
  @IsString()
  @IsDefined()
  email: string;
  @IsString()
  @IsDefined()
  password: string;
}
