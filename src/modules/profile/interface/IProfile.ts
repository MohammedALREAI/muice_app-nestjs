import { User } from '../../auth/entities/user.entity';
import { Profile } from '../profile.entity';
import { CreateProfileDto } from '../../auth/dto/create-profile.dto';
export interface IProfile {
  getProfileData(user: User): Promise<Profile>

  deleteProfile(id: number): Promise<void>

  editProfile(user: User, createProfileDto: CreateProfileDto): Promise<Profile>

  setProfileImage(user: User, image: any): Promise<Profile>

  changeProfileImage(user: User, image: any): Promise<Profile>

  deleteProfileImage(user: User): Promise<Profile>

}
