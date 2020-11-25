import { IsDefined, IsString, IsNumber } from 'class-validator';
import { Gender } from '../../../commons/enums/gender.enum';

export class CreateProfileDto {
  @IsString()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsDefined()
  lastName: string;

  @IsNumber()
  @IsDefined()
  age: number;

  @IsString()
  @IsDefined()
  phone: string;

  gender: Gender;

  @IsString()
  @IsDefined()
  country: string;

  @IsString()
  @IsDefined()
  city: string;

  @IsString()
  @IsDefined()
  address: string;
}
