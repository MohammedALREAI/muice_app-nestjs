import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianAlbum } from './musician-album.entity';
import { MusicianAlbumController } from './musician-album.controller';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { MusicianAlbumService } from './musician-album.service';
import { PassportModule } from '@nestjs/passport';
import { MusicModule } from '../music/music.module';
import { Config } from '../../config';
@Module({
  imports: [
    TypeOrmModule.forFeature([MusicianAlbum]),
    AwsModule,
    PassportModule.register({
      defaultStrategy: Config.Auth.Jwt.strategies[0],
    }),
    MusicModule,
  ],
  controllers: [MusicianAlbumController],
  providers: [MusicianAlbumService],
  exports: [MusicianAlbumService],
})
export class MusicianAlbumModule {}
