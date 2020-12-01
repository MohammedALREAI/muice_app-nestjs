import {  Column, Entity, Unique } from 'typeorm';
import { Shared } from '../../../commons/classes/abstract-shared';


@Entity('forgotten-passwords')
@Unique(['email', 'newPasswordToken'])
export class ForgottenPassword extends Shared {

  @Column()
  email: string;

  @Column()
  newPasswordToken: string;


}
