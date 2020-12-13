import { IsDefined, IsString } from 'class-validator';
export class EmailLoginDto {
  @IsString()
  @IsDefined()
  email: string;
  @IsString()
  @IsDefined()
  password: string;
}

