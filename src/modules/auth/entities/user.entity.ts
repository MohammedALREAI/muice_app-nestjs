import {
  BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique,
  BeforeUpdate, BeforeInsert
} from 'typeorm';

import { Role } from '../../../commons/enums/role.enum';
import * as bcrypt from 'bcryptjs';
import { Profile } from '../../profile/profile.entity';
import { Playlist } from '../../playlist/playlist.entity';
import { Message } from '../../../shared/modules/chat/entities/message.entity';
import { UserJoinedRoom } from '../../../shared/modules/chat/entities/user-joined-room.entity';
import { Subscriber } from '../../notification/entities/subscriber.entity';
import { IsDefined, IsEmail, IsBoolean, IsString, IsNumber, } from 'class-validator';

@Entity('users')

//name is user
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @IsDefined()
  @IsString()
  @Column()
  username: string;
  @IsDefined()
  @IsString()
  @Column({
    nullable: true,
  })
  password: string;
  @IsEmail()
  @IsDefined()
  @IsString()

  @Column()
  email: string;


  /// more than on role  that found
  // @IsOptional()
  // @IsEnum(Permissions, { each: true })
  @Column({
    type: 'enum',
    enum: Role,
    array: true,
  })
  roles: Role[];


  // new column
  @IsBoolean()
  @Column({
    default: false,
  })
  isEmailVerified: boolean;


  //  new column
  // this column is related to the functionality of signIn with facebook
  @IsDefined()
  @IsString()
  @Column({
    nullable: true,
  })
  googleId: string;

  //  new column
  // this column is related to the functionality of signIn with facebook
  @IsDefined()
  @IsString()
  @Column({
    nullable: true,
  })
  facebookId: string;

  @OneToOne(type => Profile, profile => profile.user)
  @JoinColumn()
  profile: Profile;

  @OneToOne(type => Subscriber, subscriber => subscriber.user)
  @JoinColumn()
  subscriber: Subscriber;

  @OneToMany(type => Playlist, playlist => playlist.user, {
    eager: true,
  })
  playlists: Playlist[];

  @OneToMany(type => Message, message => message.user, {
    eager: true,
  })
  messages: Message[];

  @OneToMany(type => UserJoinedRoom,
    userJoinedRoom => userJoinedRoom.user, {
    eager: true,
  })
  userJoinedRooms: UserJoinedRoom[];

  // Foreign Key
  @IsDefined()
  @IsNumber()
  @Column()
  profileId: number;

  // Foreign Key
  @IsDefined()
  @IsNumber()
  @Column({
    nullable: true,
  })
  subscriberId: number;


  // this column related to socket io
  @IsDefined()
  @IsString()
  @Column({
    nullable: true,
  })
  clientId: string;


  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(password: string): Promise<void> {
    if (this.password) {
      const slat = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, slat);
      this.password = hashedPassword;
    }
  }

  async comparePassword(hashPassword: string): Promise<boolean> {
    if (hashPassword) {
      return await bcrypt.compare(hashPassword, this.password);
    }
    return false

  }



}
