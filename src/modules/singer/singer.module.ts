import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerRepository } from './singer.repository';
import { SingerController } from './singer.controller';
import { SingerService } from './singer.service';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { PassportModule } from '@nestjs/passport';
import { SingerAlbumModule } from '../singer-album/singer-album.module';
import { AuthJwt } from '../../config';

@Module({
  imports: [TypeOrmModule.forFeature([SingerRepository]),
  PassportModule.register({
    defaultStrategy: AuthJwt.strategies[0],
  }),
    AwsModule, SingerAlbumModule],
  controllers: [SingerController],
  providers: [SingerService]

})
export class SingerModule { }
