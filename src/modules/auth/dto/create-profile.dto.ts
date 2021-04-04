import { PickType, PartialType } from '@nestjs/mapped-types';
import { Gender } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    name: 'firstName',
    required: true,
    description: 'firstName enter for user',
  })
  @IsString()
  @Min(3)
  firstName: string;
  @ApiProperty({
    name: 'lastName',
    required: true,
    description: 'lastName enter for user',
  })
  @IsString()
  @Min(3)
  lastName: string;

  @ApiProperty({
    name: 'age',
    required: true,
    description: 'age enter for user',
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    name: 'Phone',
    required: true,
    description: 'phone enter for user',
  })
  phone: string;
  @ApiProperty({
    enum: Gender,
    name: 'age',
    required: true,
    description: 'GENDER',
  })
  gender: Gender;
  @ApiProperty({
    name: 'country',
    required: true,
    description: 'country enter for user',
  })
  @IsString()
  country: string;

  @ApiProperty({
    name: 'city',
    required: true,
    description: 'city enter for user',
  })
  @IsString()
  city: string;

  @ApiProperty({
    name: 'address',
    required: true,
    description: 'address enter for user',
  })
  @IsString()
  address: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
