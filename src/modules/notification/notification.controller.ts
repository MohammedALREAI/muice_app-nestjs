import { GetByIdDto } from './../../commons/dto/getByID';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { AcceptedAuthGuard } from '../../commons/guards/accepted-auth.guard';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from '../auth/entities/user.entity';
import { NotificationPayloadDto } from '././dto/notification-payload.dto';
import { NotificationService } from './notification.service';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { Role } from '../../commons/enums/index.Enum';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  /**
   * get all the notificationService
   * @returns
   */

  @ApiTags('notifications')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the  getAllSubscribers ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('subscribers')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  getAllSubscribers() {
    return this.notificationService.getAllSubscribers();
  }

  @ApiTags('notifications')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get getSubscriberNotifications ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('subscribers/subscriber-notifications')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  getSubscriberNotifications(@GetAuthenticatedUser() user: User) {
    if (user.subscriberId) {
      return this.notificationService.getSubscriberNotifications(
        user.subscriberId,
      );
    } else {
      return null;
    }
  }

  @ApiTags('notifications')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get getSubscriberNotifications ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({
    name: 'id',
    description: 'id get by id ',
    required: true,
    type: GetByIdDto,
  })
  @Get('subscribers/:id')
  @UseGuards(AuthGuard(), AcceptedAuthGuard)
  @Roles([Role.ADMIN, Role.USER])
  getSubscriberById(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.notificationService.getSubscriberById(id);
  }

  @Post('subscribers/new')
  @UseGuards(AuthGuard(), AcceptedAuthGuard)
  @Roles([Role.ADMIN, Role.USER])
  newSubscriber(@GetAuthenticatedUser() user: User, @Body() subscriber: any) {
    return this.notificationService.newSubscriber(user, subscriber);
  }

  @ApiTags('notifications')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get getSubscriberNotifications ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Post('send-notification')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  sendNotification(@Body() notificationPayloadDto: NotificationPayloadDto) {
    return this.notificationService.sendNewNotification(notificationPayloadDto);
  }
}
