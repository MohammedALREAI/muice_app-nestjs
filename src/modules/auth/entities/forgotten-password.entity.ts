import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Shared } from '../../../commons/classes/shared.entity';

@Entity('forgotten-passwords')
@Unique(['email', 'newPasswordToken'])
export class ForgottenPassword extends Shared {

  @Column()
  email: string;

  @Column()
  newPasswordToken: string;


}
