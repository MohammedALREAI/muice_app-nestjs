import { EntityRepository, Repository, } from 'typeorm';

import { Profile } from '../profile.entity';
import { AwsService } from '../../../shared/modules/aws/aws.service';
import { User } from '../../auth/entities/user.entity';
import { NotFoundException, InternalServerErrorException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateProfileDto } from '../../auth/dto/create-profile.dto';

//  when we will be used the  app  we need to injection it
// this is a provider
@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {

  constructor(private awsService: AwsService) {
    super()
  }

  async getProfileData(user: User): Promise<Profile> {
    try {
      const profile = await this.findOne({ id: user.id });
      if (!profile) {
        throw new NotFoundException('profile does not found');
      }
      return profile;

    } catch (e) {
      throw new InternalServerErrorException(`there are some error in server ${e}`)

    }
  }

  async deleteProfile(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('profile does not found');
    }
  }

  async editProfile(user: User, createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = await this.getProfileData(user);
    const { firstName, lastName, phone, age, address, city, country, gender }
      = createProfileDto;
    if (firstName) {
      profile.firstName = firstName;
    }
    if (lastName) {
      profile.lastName = lastName;
    }
    if (phone) {
      profile.phone = phone;
    }
    if (age) {
      profile.age = age;
    }
    if (address) {
      profile.address = address;
    }
    if (city) {
      profile.city = city;
    }
    if (country) {
      profile.country = country;
    }
    if (gender) {
      profile.gender = gender;
    }
    try {
      const savedProfile = await profile.save();
      if (!savedProfile) {
        throw new BadRequestException('profile does not found');

      }

      return savedProfile;
    } catch (e) {
      throw new InternalServerErrorException(`There are some error in server ${e}`)

    }
  }

  async setProfileImage(user: User, image: any): Promise<Profile> {
    const profile = await this.getProfileData(user);
    if (image) {
      profile.image = await this.awsService.fileUpload(image, 'profile-images');
    }
    try {
      const savedProfile = await profile.save();
      if (!savedProfile) {
        throw new BadRequestException('profile does not found');

      }

      return savedProfile;
    } catch (e) {
      throw new InternalServerErrorException(`There are some error in server ${e}`)

    }
  }

  async changeProfileImage(user: User, image: any): Promise<Profile> {
    const profile = await this.getProfileData(user);
    if (image) {
      await this.awsService.fileDelete(profile.image);
      profile.image = await this.awsService.fileUpload(image, 'profile-images');
    }
    try {
      const savedProfile = await profile.save();
      if (!savedProfile) {
        throw new BadRequestException('profile does not found');

      }

      return savedProfile;
    } catch (e) {
      throw new InternalServerErrorException(`There are some error in server ${e}`)

    }
  }

  async deleteProfileImage(user: User): Promise<Profile> {
    const profile = await this.getProfileData(user);
    if (!profile.image) {
      throw new ConflictException('the profile is already set to null!');
    }
    await this.awsService.fileDelete(profile.image);
    profile.image = null;

    try {
      const savedProfile = await profile.save();
      if (!savedProfile) {
        throw new BadRequestException('profile does not found');

      }

      return savedProfile;
    } catch (e) {
      throw new InternalServerErrorException(`There are some error in server ${e}`)

    }
  }

}

