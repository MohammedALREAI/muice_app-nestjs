import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerAlbum } from './singer-album.entity';
import { SingerAlbumController } from './singer-album.controller';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { SingerAlbumService } from './singer-album.service';
import { PassportModule } from '@nestjs/passport';
import { SongModule } from '../song/song.module';

@Module({
  imports: [TypeOrmModule.forFeature([SingerAlbum]), PassportModule.register({
    defaultStrategy: 'jwt',
  }), AwsModule, SongModule],
  controllers: [SingerAlbumController],
  providers: [SingerAlbumService],
  exports: [SingerAlbumService]

})
export class SingerAlbumModule { }
