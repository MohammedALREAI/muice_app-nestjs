import { Gender } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {


  @ApiProperty()
  firstName: string;
  @ApiProperty()

  lastName: string;
  @ApiProperty()

  age: number;
  @ApiProperty()

  phone: string;
  @ApiProperty()

  gender: Gender;
  @ApiProperty()
  country: string;


  @ApiProperty()

  city: string;


  @ApiProperty()

  address: string;
}

