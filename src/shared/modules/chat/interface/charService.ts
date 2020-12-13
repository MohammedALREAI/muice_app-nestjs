import { User } from '../../../../modules/auth/entities/user.entity';
import { RoomDto } from '../dto/room.dto';
import { Room } from '../entities/room.entity';
export interface ChatServiceFunction {
  getAllRooms(): Promise<Room[]>,
  getRoomById(id: number): Promise<Room>,
  deleteUserMessages(user: User): Promise<void>,
  deleteUserJoinedRooms(user: User): Promise<void>,
  getUserRooms(user: User): Promise<Room[]>
  createNewRoom(user: User, createRoomDto: RoomDto): Promise<Room>
  updateRoom(id: number, updateRoomDto: RoomDto): Promise<Room>
  deleteRoom(id: number): Promise<boolean>
}
