import { UpdateProfileDto } from './../auth/dto/create-profile.dto';
import { GetByIdDto } from './../../commons/dto/getByID';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from '../auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AcceptedAuthGuard } from '../../commons/guards/accepted-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { ProfileService } from './profile.service';
import { Role } from '../../commons/enums/index.Enum';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiParam,
} from '@nestjs/swagger';

@UseGuards(AuthGuard(), AcceptedAuthGuard)
@Roles([Role.ADMIN, Role.USER])
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiTags('profiles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
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
  @Get('user-profile')
  getUserProfile(@GetAuthenticatedUser() user: User) {
    return this.profileService.getProfileData(user);
  }

  @ApiTags('profiles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Post('user-profile/set-profile-image')
  @UseInterceptors(FileInterceptor('image'))
  setProfileImage(
    @GetAuthenticatedUser() user: User,
    @UploadedFile() image: any,
  ) {
    return this.profileService.setProfileImage(user, image);
  }

  @ApiTags('profiles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Patch('user-profile/change-profile-image')
  @UseInterceptors(FileInterceptor('image'))
  changeProfileImage(
    @GetAuthenticatedUser() user: User,
    @UploadedFile() image: any,
  ) {
    return this.profileService.changeProfileImage(user, image);
  }

  @ApiTags('profiles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Put('user-profile/edit-profile')
  editProfile(
    @GetAuthenticatedUser() user: User,
    @Body('updateProfileDto') updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.editProfile(user, updateProfileDto);
  }

  @ApiTags('profiles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Delete('user-profile/delete-profile-image')
  deleteProfileImage(@GetAuthenticatedUser() user: User) {
    return this.profileService.deleteProfileImage(user);
  }
}
