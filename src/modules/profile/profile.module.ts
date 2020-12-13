import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PassportModule } from '@nestjs/passport';
import { ProfileRepository } from './dto/profile.repostory';
import config from '../../config';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository]), PassportModule.register({
    defaultStrategy: 'jwt',
  }), AwsModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  //we nned this to other section of code
  exports: [ProfileService]
})
export class ProfileModule {
}
