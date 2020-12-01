import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from '../auth/dto/create-profile.dto';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from '../auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AcceptedAuthGuard } from '../../commons/guards/accepted-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { ProfileService } from './profile.service';
import { Response } from 'express'
import { Role } from '../../commons/enums/index.Enum';

@UseGuards(AuthGuard(), AcceptedAuthGuard)
@Roles([Role.ADMIN, Role.USER])
@Controller('profiles')
export class ProfileController {

  constructor(private profileService: ProfileService) {
  }

  @Get('user-profile')
  getUserProfile(@GetAuthenticatedUser() user: User, @Res() res: Response) {
    const data = this.profileService.getProfileData(user);
    res.status(HttpStatus.FOUND).json(data);
  }


  @Post('user-profile/set-profile-image')
  @UseInterceptors(FileInterceptor('image'))
  setProfileImage(@GetAuthenticatedUser() user: User, @UploadedFile() image: any, @Res() res: Response) {

    const data = this.profileService.setProfileImage(user, image);
    res.status(HttpStatus.ACCEPTED).json(data)
  }

  @Patch('user-profile/change-profile-image')
  @UseInterceptors(FileInterceptor('image'))
  changeProfileImage(@GetAuthenticatedUser() user: User, @UploadedFile() image: any, @Res() res: Response) {

    const data = this.profileService.changeProfileImage(user, image)
    res.status(HttpStatus.ACCEPTED).json(data)
  }

  @Put('user-profile/edit-profile')
  editProfile(@GetAuthenticatedUser() user: User, @Body() createProfileDto: CreateProfileDto, @Res() res: Response) {

    const data = this.profileService.editProfile(user, createProfileDto);
    res.status(HttpStatus.OK).json(data)
  }

  @Delete('user-profile/delete-profile-image')
  deleteProfileImage(@GetAuthenticatedUser() user: User, @Res() res: Response) {

    const data = this.profileService.deleteProfileImage(user);
    res.status(HttpStatus.ACCEPTED).json(data)
  }

}
