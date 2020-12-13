import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UserJoinedRoom } from './entities/user-joined-room.entity';
import { User } from '../../../modules/auth/entities/user.entity';
import { RoomDto } from './dto/room.dto';
import { ChatServiceFunction } from './interface/charService';

@Injectable()
export class ChatService implements ChatServiceFunction {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(UserJoinedRoom) private userJoinedRoomRepository: Repository<UserJoinedRoom>) {

  }


  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async getRoomById(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
    });
    if (!room) {
      throw new NotFoundException(`Room with id ${id} does not found`);
    }
    return room;
  }

  async deleteUserMessages(user: User): Promise<void> {
    for (let i = 0; i < user.messages.length; i++) {
      await this.messageRepository.delete(user.messages[i].id);
    }
  }

  async deleteUserJoinedRooms(user: User): Promise<void> {
    for (let i = 0; i < user.userJoinedRooms.length; i++) {
      await this.userJoinedRoomRepository.delete(user.userJoinedRooms[i].id);
    }
  }


  async getUserRooms(user: User): Promise<Room[]> {
    const query = this.roomRepository.createQueryBuilder('room');
    query.select()
      .where('room.createdBy LIKE :username', { username: user.username });
    const rooms = await query.getMany();
    return rooms;
  }

  async createNewRoom(user: User,
    createRoomDto: RoomDto): Promise<Room> {
    const { name } = createRoomDto;
    const room = {} as Room;
    room.name = name;
    room.messages = [];
    room.userJoinedRooms = [];
    room.createdBy = user.username;
    return await room.save();
  }

  async updateRoom(id: number,
    updateRoomDto: RoomDto): Promise<Room> {
    const { name } = updateRoomDto;
    const room = await this.getRoomById(id);
    if (name) {
      room.name = name;
    }
    return await room.save();
  }

  async deleteRoom(id: number): Promise<boolean> {
    const room = await this.getRoomById(id);
    for (let i = 0; i < room.messages.length; i++) {
      await this.messageRepository.delete(room.messages[i].id);
    }
    for (let i = 0; i < room.userJoinedRooms.length; i++) {
      await this.userJoinedRoomRepository.delete(room.userJoinedRooms[i].id);
    }
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Room with id ${id} does not found`);
    }
    return true;
  }
}
