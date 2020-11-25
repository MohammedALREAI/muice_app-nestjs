import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PassportModule } from '@nestjs/passport';
import { AuthConstants } from '../../commons/constants/auth-constants';
import { ProfileRepository } from './dto/profile.repostory';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository]), PassportModule.register({
    defaultStrategy: AuthConstants.strategies,
  }), AwsModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {
}
