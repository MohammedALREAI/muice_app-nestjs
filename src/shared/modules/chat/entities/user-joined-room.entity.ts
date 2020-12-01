import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';
import { User } from '../../../../modules/auth/entities/user.entity';



// this relation betwwen other
// UserJoinedRoom
// room: Room;
// user: User;


@Entity('users-joined-rooms')
export class UserJoinedRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  joinedIn: Date;

  @Column()
  joinedUsername: string;

  @ManyToOne(type => Room, room => room.userJoinedRooms, {
    eager: false
  })
  room: Room;
  @Column()
  roomId: number;

  @ManyToOne(type => User, user => user.userJoinedRooms, {
    eager: false
  })
  user: User;

  @Column()
  userId: number;

  // foreign keys

}
