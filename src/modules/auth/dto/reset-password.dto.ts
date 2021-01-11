import { ApiProperty } from '@nestjs/swagger';
export class ResetPasswordDto {
  @ApiProperty()

  readonly email: string;
  @ApiProperty()

  readonly newPassword: string;

  @ApiProperty()
  readonly newPasswordToken: string;

  @ApiProperty()
  readonly currentPassword: string;

  @ApiProperty()
  readonly confirmPassword: string;
}
