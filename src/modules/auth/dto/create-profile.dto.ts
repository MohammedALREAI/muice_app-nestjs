import { Gender } from '../../../commons/enums/index.Enum';

export class CreateProfileDto {

  firstName: string;

  lastName: string;

  age: number;

  phone: string;

  gender: Gender;

  country: string;

  city: string;

  address: string;
}
