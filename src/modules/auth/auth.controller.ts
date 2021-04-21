import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  ParseIntPipe,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { AuthService } from './auth.service';
import { EmailLoginDto } from './dto/email-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../commons/decorators/roles.decorator';
import { Role } from '../../commons/enums/index.Enum';
import { AcceptedAuthGuard } from '../../commons/guards/accepted-auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from './entities/user.entity';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import {
  ApiDefaultResponse,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')

export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'register new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  signUp(
    @Body('authCredentialsDto') authCredentialsDto: AuthCredentialsDto,
    @Body('createProfileDto') createProfileDto: CreateProfileDto,
  ) {
    return this.authService.signUp(authCredentialsDto, createProfileDto);
  }

  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'verify new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('email/send-email-verification/:email')
  async sendEmailVerification(@Param('email') email: string) {
    await this.authService.createEmailToken(email);
    return this.authService.sendEmailVerification(email);
  }
  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'callback facebook new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @Get('email/verify/:token')
  verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  /*                  Social Endpoints                   */

  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'verify new user by google ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    console.log('dsd');
  }

  // related to callback --> redirection to frontend

  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'callback google new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @Get('google/callback')
  @UseGuards(AuthGuard(['google']))
  googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    const { id } = req.user.user;
    if (jwt) {
      res.redirect(
        `http://localhost:4200/auth/google-success/userId:${id}/accessToken:${jwt}`,
      );
    } else {
      res.redirect('http://localhost:4200/auth/google-failure');
    }
  }
  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'callback facebook new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookLogin() {
    console.log('done');
  }

  // related to callback --> redirection to frontend

  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'callback facebook new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    const { id } = req.user.user;
    if (jwt) {
      res.redirect(
        `http://localhost:4200/auth/facebook-success/userId:${id}/accessToken:${jwt}`,
      );
    } else {
      res.redirect('http://localhost:4200/auth/facebook-failure');
    }
  }
  

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'login   user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'get getUserMainData ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Post('login/user')
  signInUser(@Body() emailLoginDto: EmailLoginDto) {
    return this.authService.signInUser(emailLoginDto);
  }
  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'get getUserMainData ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'callback facebook new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @Get('email/forgot-password/:email')
  sendEmailForgotPassword(@Param('email') email: string) {
    return this.authService.sendEmailForgottenPassword(email);
  }
  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'get getUserMainData ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Post('email/reset-password')
  setNewPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.setNewPassword(resetPasswordDto);
  }

  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'get getUserMainData ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('user-main-data')
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard('jwt'), AcceptedAuthGuard)
  @Roles([Role.USER, Role.ADMIN])
  getUserData(@GetAuthenticatedUser() user: User) {
    return this.authService.getUserMainData(user);
  }

  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get getUserMainData ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })

  @ApiBearerAuth("jwt")

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'callback facebook new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @Delete('delete-user-account')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  deleteUserAccount(@GetAuthenticatedUser() user: User) {
    return this.authService.deleteUserAccount(user);
  }
  @ApiBearerAuth("jwt")  
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'callback facebook new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @Get('check-username/:username')
  isValidUsername(@Param('username') username: string) {
    return this.authService.isValidUsername(username);
  }
  

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'login   user Admin ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Post('login/admin')
  signInAdmin(@Body() emailLoginDto: EmailLoginDto) {
    return this.authService.signInAdmin(emailLoginDto);
  }
  @ApiBearerAuth("jwt")

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ description: 'callback facebook new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @Get('system-users')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  getSystemUsers() {
    return this.authService.getSystemUsers();
  }
  
  @ApiBearerAuth("jwt")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get user   by id ' })
  @ApiParam({ name: 'id', description: 'user id ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('users/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUserById(id);
  }
  
  @ApiBearerAuth("jwt")

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get user   by id ' })
  @ApiParam({ name: 'userId', description: 'user id ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with verification ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Put('edit-user-roles/:userId')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  editUserRoles(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() roles: Role[],
  ) {
    return this.authService.editUserRoles(userId, roles);
  }
}
