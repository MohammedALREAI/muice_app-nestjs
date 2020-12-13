import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import { User } from './user.entity';
import { Music } from '../../music/music.entity';


// user try login
// count
// user is used add colum is number try
// status account
// active ->
//  user entry more the three time =>susspance account

@EventSubscriber()
export class NumberCountSubscriber implements EntitySubscriberInterface<User>{
  listenTo() {
    return User
  }
  async afterInsert(event: InsertEvent<User>) {
    const userRep: Repository<User> = event.connection.getRepository('users');
    const musicRep: Repository<Music> = event.connection.getRepository<Music>('');
    return {
      userRep,
      musicRep
    }



  }


}
