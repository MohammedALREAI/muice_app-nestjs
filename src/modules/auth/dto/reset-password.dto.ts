import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
export class ResetPasswordDto {
  @ApiProperty()
  @ApiProperty({
    name: 'email',
    required: true,
    description: 'please enter user email ',
  })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    name: 'newPassword',
    required: true,
    description: 'please enter user email ',
  })
  readonly newPassword: string;

  @ApiProperty({
    name: 'newPasswordToken',
    required: true,
    description: 'please enter user newPasswordToken ',
  })
  readonly newPasswordToken: string;

  @ApiProperty({
    name: 'currentPassword',
    required: true,
    description: 'please enter user currentPassword ',
  })
  readonly currentPassword: string;

  @ApiProperty({
    name: 'confirmPassword',
    required: true,
    description: 'please enter user confirmPassword ',
  })
  readonly confirmPassword: string;
}
