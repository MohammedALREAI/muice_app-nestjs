import { Roles } from './../../../commons/decorators/roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from '../../../commons/guards/user-auth.guard';
import { GetAuthenticatedUser } from '../../../commons/decorators/get-authenticated-user.decorator';
import { User } from '../../../modules/auth/entities/user.entity';
import { RoomDto } from './dto/room.dto';
import { ChatService } from './chat.service';
import { Role } from '../../../commons/enums/index.Enum';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse ,ApiTags, ApiBearerAuth} from '@nestjs/swagger';

@UseGuards(AuthGuard(), UserAuthGuard)
@Roles([Role.USER])
@Controller('rooms')
@ApiTags('rooms')
@ApiBearerAuth("JWT")
export class RoomController {
  constructor(private chatService: ChatService) {}


  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the singers-albums ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get()
  getAllRooms() {
    return this.chatService.getAllRooms();
  }

  @Get(':id')
  getRoomById(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.getRoomById(id);
  }

  @Get('user-rooms')
  getUserRooms(@GetAuthenticatedUser() user: User) {
    return this.chatService.getUserRooms(user);
  }

  @Post()
  createNewRoom(
    @GetAuthenticatedUser() user: User,
    @Body() createRoomDto: RoomDto,
  ) {
    return this.chatService.createNewRoom(user, createRoomDto);
  }

  @Put(':id/edit-room')
  updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomDto: RoomDto,
  ) {
    return this.chatService.updateRoom(id, updateRoomDto);
  }

  @Delete(':id/delete-room')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.deleteRoom(id);
  }
}
