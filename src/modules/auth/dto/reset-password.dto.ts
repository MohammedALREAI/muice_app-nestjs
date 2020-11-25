import { IsDefined, IsString } from 'class-validator';
export class ResetPasswordDto {


  @IsString()
  @IsDefined()
  readonly email: string;

  @IsString()
  @IsDefined()
  readonly newPassword: string;

  @IsString()
  @IsDefined()
  readonly newPasswordToken: string;

  @IsString()
  @IsDefined()
  readonly currentPassword: string;

  @IsString()
  @IsDefined()
  readonly confirmPassword: string;
}
