import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PassportModule } from '@nestjs/passport';
import { Config } from './../../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PassportModule.register({
      defaultStrategy: Config.Auth.Jwt.strategies[0],
    }),
    AwsModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
