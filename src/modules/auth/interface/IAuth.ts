import { SignUpBody } from '../auth.controller';
import { User } from '../entities/user.entity';
import { Profile } from '../../profile/profile.entity';
import { Favorite } from '../../favorite/favorite.entity';
import { EmailLoginDto } from '../dto/email-login.dto';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
export interface IAuth {
  signUp(signUpBody: SignUpBody): Promise<void>
  SignInGoogle(profile: any, googleId: string): Promise<{ user: User, jwt: string }>

  SingInFacebook(profile: any, facebookId: string): Promise<{ user: User, jwt: string }>
  setUserInfo(user: User, profile: any)
  getUserMainData(user: User): Promise<{ user: User, profile: Profile, favorite: Favorite }>
  signInUser(emailLoginDto: EmailLoginDto): Promise<{ token: string }>
  checkIfEmailExist(email: string): Promise<boolean>
  generateJwtToken(email: string)
  createProfile(user: User, createProfileDto: CreateProfileDto): Promise<Profile>
  createFavoriteList(profile: Profile): Promise<Favorite>
  createEmailToken(email: string)
  sendEmailVerification(email: string): Promise<any>
  verifyEmail(token: string): Promise<{ isFullyVerified: boolean, user: User }>
  sendEmailForgottenPassword(email: string): Promise<any>
  createForgottenPasswordToken(email: string)
  checkPassword(email: string, password: string)
  setNewPassword(resetPasswordDto: ResetPasswordDto)
  setPassword(email: string, newPassword: string)
  signInAdmin(emailLoginDto: EmailLoginDto): Promise<{ accessToken: string, user: User }>

}
