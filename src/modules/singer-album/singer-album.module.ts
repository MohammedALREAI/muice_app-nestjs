import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerAlbum } from './singer-album.entity';
import { SingerAlbumController } from './singer-album.controller';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { SingerAlbumService } from './singer-album.service';
import { PassportModule } from '@nestjs/passport';
import { SongModule } from '../song/song.module';
import { AuthJwt } from '../../config';

@Module({
  imports: [TypeOrmModule.forFeature([SingerAlbum]), PassportModule.register({
    defaultStrategy: AuthJwt.strategies[0],
  }), AwsModule, SongModule],
  controllers: [SingerAlbumController],
  providers: [SingerAlbumService],
  exports: [SingerAlbumService]

})
export class SingerAlbumModule { }
