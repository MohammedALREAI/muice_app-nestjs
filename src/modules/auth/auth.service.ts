import {
  BadRequestException,
  ConflictException, forwardRef,
  HttpException,
  HttpStatus, Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { Profile } from '../profile/profile.entity';
import { Favorite } from '../favorite/favorite.entity';
import { Role } from '../../commons/enums/index.Enum';
import { EmailVerification } from './entities/email-verification.entity';
import { Repository } from 'typeorm';
import { Nodemailer, NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import { EmailLoginDto } from './dto/email-login.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgottenPassword } from './entities/forgotten-password.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ProfileService } from '../profile/profile.service';
import { FavoriteService } from '../favorite/favorite.service';
import { PlaylistService } from '../playlist/playlist.service';
import { ChatService } from '../../shared/modules/chat/chat.service';
import { NotificationService } from '../notification/notification.service';
import { SignUpBody } from './auth.controller';
import { template } from '../../commons/helpers/Mail';
import { IAuth } from './interface/IAuth';
@Injectable()
export class AuthService implements IAuth {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(EmailVerification) private emailVerificationRepo: Repository<EmailVerification>,
    @InjectRepository(ForgottenPassword) private forgottenPasswordRepo: Repository<ForgottenPassword>,
    private nodeMailerService: Nodemailer<NodemailerDrivers.SMTP>,
    private jwtService: JwtService,
    private profileService: ProfileService,
    private favoriteService: FavoriteService,
    private playlistService: PlaylistService,
    private notificationService: NotificationService,
    private configService: ConfigService,
    @Inject(forwardRef(() => ChatService)) private chatService: ChatService) {
  }




  async signUp(signUpBody: SignUpBody): Promise<void> {
    const { username,
      password,
      email,
      firstName,
      lastName,
      age,
      phone,
      gender,
      country,
      city,
      address,

    } = signUpBody;
    const profile = {
      firstName,
      lastName,
      age,
      phone,
      gender,
      country,
      city,
      address,
    }
    const isValid = this.userRepository.isValidEmail(email)
    if (!isValid) {
      throw new BadRequestException('You have entered invalid email');
    }
    const user = new User();
    const isFound_Mail = await this.userRepository.findByEmail(email)
    if ((await this.isValidUsername(username))) {
      throw new ConflictException(`Username ${username} is not available, please try another one`);
    } else {
      user.username = username;
    }

    if ((await this.checkIfEmailExist(email))) {
      throw new ConflictException(`Email ${email} is not available, please try another one`);
    } else {
      user.email = email;
    }

    user.roles = [Role.USER];
    user.password = password;
    user.profile = await this.createProfile(user, profile);
    user.playlists = [];
    // sending emails verification
    await this.createEmailToken(email);
    await this.sendEmailVerification(email);

    await user.save();
  }


  /*                  Social Methods                   */
  async SignInGoogle(profile: any, googleId: string): Promise<{ user: User, jwt: string }> {
    const { emails } = profile;
    let googleUser = {} as User;
    googleUser.googleId = googleId;
    googleUser = await this.setUserInfo(googleUser, profile);
    const jwt = this.generateJwtToken(emails[0].value);
    const user = await googleUser.save();
    return { user, jwt };
  }

  async SingInFacebook(profile: any, facebookId: string): Promise<{ user: User, jwt: string }> {
    const { emails } = profile;
    let facebookUser = new User();
    facebookUser.facebookId = facebookId;
    facebookUser = await this.setUserInfo(facebookUser, profile);
    const jwt = this.generateJwtToken(emails[0].value);
    const user = await facebookUser.save();
    return { user, jwt };
  }


  async setUserInfo(user: User, profile: any) {
    const { name, displayName, emails, photos } = profile;

    // check if email and username is available
    if ((await this.isValidUsername(displayName))) {
      throw new ConflictException(`Username ${displayName} is not available, please try another one`);
    }
    if ((await this.checkIfEmailExist(emails[0].value))) {
      throw new ConflictException(`Email ${emails[0].value} is not available, please try another one`);
    }
    user.username = displayName;
    user.email = emails[0].value;
    user.roles = [Role.USER];
    const newProfile = {} as Profile;
    newProfile.user = user;
    newProfile.firstName = name.givenName;
    newProfile.lastName = name.familyName;
    newProfile.image = photos[0].value;
    newProfile.favorite = await this.createFavoriteList(newProfile);
    user.profile = await newProfile.save();
    user.isEmailVerified = true;
    return user;
  }


  async getUserMainData(user: User): Promise<{ user: User, profile: Profile, favorite: Favorite }> {
    const profile = await this.profileService.getProfileData(user);
    const favorite = await this.favoriteService.getUserFavoriteList(profile.favoriteId);

    return {
      user,
      profile,
      favorite
    };
  }

  async signInUser(emailLoginDto: EmailLoginDto): Promise<{ token: string }> {
    const isValid = this.userRepository.isValidEmail(emailLoginDto.email)

    if (!isValid) {
      throw new BadRequestException('Invalid Email Signature');
    }
    const { email, user } = await this.userRepository.validateUserPassword(emailLoginDto);
    const token = this.generateJwtToken(email);
    return { token };
  }

  async checkIfEmailExist(email: string): Promise<boolean> {
    const query = this.userRepository.createQueryBuilder('user');
    const isEmailExist = query.select('email')
      .where('user.email LIKE :email', { email });
    const count = await isEmailExist.getCount();
    return count >= 1;
  }


  // this method well be used in different methods
  generateJwtToken(email: string) {
    const jwt = this.jwtService.sign(email);
    return jwt;
  }

  async createProfile(user: User, createProfileDto: CreateProfileDto): Promise<Profile> {

    const profile = {} as Profile
    const favorite = await this.createFavoriteList(profile); // create a foreign key
    const profile2 = await Profile.create({
      ...createProfileDto,
      user,
      favorite: await this.createFavoriteList(profile)
    }).save();

    return await profile.save();
  }

  async createFavoriteList(profile: Profile): Promise<Favorite> {
    const tracks = [];
    try {
      const favorite = await Favorite.create({
        profile,
        tracks

      }).save();
      if (favorite) {
        return favorite

      }
    } catch (e) {


    }

    return
  }


  async createEmailToken(email: string) {
    const verifiedEmail = await this.emailVerificationRepo.findOne({ email });
    if (verifiedEmail && ((new Date().getTime() - verifiedEmail.timestamp.getTime()) / 60000) < 15) {
      throw new HttpException('LOGIN_EMAIL_SENT_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const newEmailVerification = new EmailVerification();
      newEmailVerification.email = email;
      newEmailVerification.emailToken = (Math.floor(Math.random() * (900000)) + 100000).toString();
      newEmailVerification.timestamp = new Date();
      await newEmailVerification.save();
      return true;
    }
  }

  async sendEmailVerification(email: string): Promise<any> {
    const { url, port, endpoints } = this.configService.get('frontEndKeys');
    const { username } = this.configService.get("nodeMailerOptions").transport.auth

    const verifiedEmail = await this.emailVerificationRepo.findOne({ email });
    if (verifiedEmail && verifiedEmail.emailToken) {
      const sendUrl = `<a style='text-decoration:none;'
    href= http://${url}:${port}/${endpoints[1]}/${verifiedEmail.emailToken}>Click Here to confirm your email</a>`;
      const op = template.VerifyEmail(username, verifiedEmail.email, sendUrl)

      await this.nodeMailerService.sendMail(op).then(info => {
        console.log('Message sent: %s', info.messageId);
      }).catch(err => {
        console.log('Message sent: %s', err);
      });
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  }

  async verifyEmail(token: string): Promise<{ isFullyVerified: boolean, user: User }> {
    const verifiedEmail = await this.emailVerificationRepo.findOne({ emailToken: token });
    if (verifiedEmail && verifiedEmail.email) {
      const user = await this.userRepository.findOne({ email: verifiedEmail.email });
      if (user) {
        user.isEmailVerified = true;
        const updatedUser = await user.save();
        await verifiedEmail.remove();
        return { isFullyVerified: true, user: updatedUser };
      }
    } else {
      throw new HttpException('LOGIN_EMAIL_CODE_NOT_VALID', HttpStatus.FORBIDDEN);
    }
  }





  async sendEmailForgottenPassword(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new HttpException('LOGIN_USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    const tokenModel = await this.createForgottenPasswordToken(email);
    if (tokenModel && tokenModel.newPasswordToken) {
      const { url, port, endpoints
      } = this.configService.get('frontEndKeys')
      const { username } = this.configService.get("nodeMailerOptions").transport.auth

      const sendUrl = `<a style='text-decoration:none;'
    href= http://${url}:${port}/${endpoints[0]}/${tokenModel.newPasswordToken}>Click here to reset your password</a>`;
      const op = template.ResetPassword(username, email, sendUrl)
      return await this.nodeMailerService.sendMail(op).then(info => {
        console.log('Message sent: %s', info.messageId);
      }).catch(err => {
        console.log('Message sent: %s', err);
      });
    }
  }

  async createForgottenPasswordToken(email: string) {
    let forgottenPassword = await this.forgottenPasswordRepo.findOne({ email });
    if (forgottenPassword && ((new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000) < 15) {
      throw new HttpException('RESET_PASSWORD_EMAIL_SENT_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      forgottenPassword = new ForgottenPassword();
      forgottenPassword.email = email;
      forgottenPassword.timestamp = new Date();
      forgottenPassword.newPasswordToken = (Math.floor(Math.random() * (900000)) + 100000).toString();
      return await forgottenPassword.save();
    }
  }

  async checkPassword(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new HttpException('User Does not Found', HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.comparePassword(password);
  }

  async setNewPassword(resetPasswordDto: ResetPasswordDto) {
    let isNewPasswordChanged = false;
    const { email, newPasswordToken, currentPassword, newPassword } = resetPasswordDto;
    if (email && currentPassword) {
      const isValidPassword = await this.checkPassword(email, currentPassword);
      if (isValidPassword) {
        isNewPasswordChanged = await this.setPassword(email, newPassword);
      } else {
        throw new HttpException('RESET_PASSWORD_WRONG_CURRENT_PASSWORD', HttpStatus.CONFLICT);
      }
    } else if (newPasswordToken) {
      const forgottenPassword = await this.forgottenPasswordRepo.findOne({ newPasswordToken });
      isNewPasswordChanged = await this.setPassword(forgottenPassword.email, newPassword);
      if (isNewPasswordChanged) {
        await this.forgottenPasswordRepo.delete(forgottenPassword.id);
      }
    } else {
      return new HttpException('RESET_PASSWORD_CHANGE_PASSWORD_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return isNewPasswordChanged;
  }

  async setPassword(email: string, newPassword: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new HttpException('LOGIN_USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    user.password = newPassword
    await user.save();
    return true;
  }

  async signInAdmin(emailLoginDto: EmailLoginDto): Promise<{ accessToken: string, user: User }> {
    const isValid = this.userRepository.isValidEmail(emailLoginDto.email)

    if (!isValid) {
      throw new BadRequestException('Invalid Email Signature');
    }
    const { email, user } = await this.userRepository.validateAdminPassword(emailLoginDto);
    const accessToken = this.jwtService.sign(email);
    return { accessToken, user };
  }

  async getSystemUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with Id ${id} Does not found`);
    }
    return user;
  }

  async editUserRoles(id: number, roles: Role[]): Promise<User> {
    const user = await this.getUserById(id);
    if (roles) {
      user.roles = roles;
    }
    return await user.save();
  }

  async deleteUserAccount(user: User) {
    const profile = await this.profileService.getProfileData(user);
    const favoriteId = profile.favoriteId;
    const subscriber = await this.notificationService.getSubscriberById(user.subscriberId);
    // procedure-1: delete-user-playlists/ messages/ and related rooms
    for (let i = 0; i < user.playlists.length; i++) {
      await this.playlistService.deletePlaylist(user.playlists[i].id);
    }

    await this.chatService.deleteUserMessages(user);
    await this.chatService.deleteUserJoinedRooms(user);


    // procedure-2: delete-user
    await this.userRepository.delete(user.id);

    // procedure-3: delete-user-profile
    await this.profileService.deleteProfile(profile.id);

    // procedure-4: delete user subscriber
    await this.notificationService.deleteSubscriber(subscriber.id);
    // procedure-5: delete-user-favorite-list

    await this.favoriteService.deleteFavoriteList(favoriteId);

    return true;

  }

  async isValidUsername(username: string): Promise<boolean> {
    const query = this.userRepository.createQueryBuilder('user').select('username');
    query.where('user.username LIKE :username', { username });
    const count = await query.getCount();
    return count >= 1;
  }


  // creating this method is just response to chat gateway
  async findUser(id: number, nickname?: string, clientId?: string): Promise<User> {
    let user = null;
    if (id) {
      user = await this.getUserById(id);
    } else if (nickname) {
      user = await this.userRepository.findOne({ username: nickname });
    } else if (clientId) {
      user = await this.userRepository.findOne({ clientId });
    } else {
      throw new NotFoundException(`User with Id ${id} Does not found`);
    }
    return user;
  }

}
