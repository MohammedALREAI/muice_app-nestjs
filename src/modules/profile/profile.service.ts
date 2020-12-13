import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { User } from '../auth/entities/user.entity';
import { CreateProfileDto } from '../auth/dto/create-profile.dto';
import { AwsService } from '../../shared/modules/aws/aws.service';
import { ProfileRepository } from './dto/profile.repostory';
import { IProfile } from './interface/IProfile';


@Injectable()
export class ProfileService implements IProfile {
  constructor(@InjectRepository(ProfileRepository) private profileRepository: ProfileRepository,
    private awsService: AwsService) {
  }

  async getProfileData(user: User): Promise<Profile> {
    return await this.profileRepository.getProfileData(user)
  }

  async deleteProfile(id: number): Promise<void> {
    return await this.profileRepository.deleteProfile(id)
  }

  async editProfile(user: User, createProfileDto: CreateProfileDto): Promise<Profile> {
    return await this.profileRepository.editProfile(user, createProfileDto)
  }

  async setProfileImage(user: User, image: any): Promise<Profile> {
    return await this.profileRepository.setProfileImage(user, image)
  }

  async changeProfileImage(user: User, image: any): Promise<Profile> {
    return await this.profileRepository.changeProfileImage(user, image)
  }

  async deleteProfileImage(user: User): Promise<Profile> {
    return await this.profileRepository.deleteProfileImage(user)
  }
}
