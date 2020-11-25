import { Column, Entity, Unique } from 'typeorm';
import { Shared } from '../../../commons/classes/shared.entity';

@Entity('verified-emails')
@Unique(['email', 'emailToken'])
export class EmailVerification extends Shared {


  @Column()
  email: string;

  @Column()
  emailToken: string;


}
