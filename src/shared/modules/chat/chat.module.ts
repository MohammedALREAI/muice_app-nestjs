import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Message } from './entities/message.entity';
import { UserJoinedRoom } from './entities/user-joined-room.entity';
import { PassportModule } from '@nestjs/passport';
import { RoomController } from './room.controller';
import { ChatService } from './chat.service';
import { AuthModule } from '../../../modules/auth/auth.module';
import { ChatGateway } from './chat.gateway';
import config from '../../../config';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message, UserJoinedRoom]),
  PassportModule.register({
    defaultStrategy: config().AuthJwt.strategies,
  }),
  forwardRef(() => AuthModule)],
  providers: [ChatGateway, ChatService],
  controllers: [RoomController],
  exports: [ChatService],
})
export class ChatModule {
}
