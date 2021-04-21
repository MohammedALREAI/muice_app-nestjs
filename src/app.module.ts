import { LoggerModule } from './shared/modules/logger/logger.module';
import { AwsModule } from './modules/aws/aws.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MusicianModule } from './modules/musician/musician.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { SongModule } from './modules/song/song.module';
import { MusicModule } from './modules/music/music.module';
import { MusicianAlbumModule } from './modules/musician-album/musician-album.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SingerModule } from './modules/singer/singer.module';
import { SingerAlbumModule } from './modules/singer-album/singer-album.module';
import { TrackModule } from './modules/track/track.module';
import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { ChatModule } from './shared/modules/chat/chat.module';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseConnectionService } from './DatabaseConnectionService ';
import { Config } from './config';
@Module({
  imports: [
    LoggerModule,

    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    MulterModule.register({
      dest: './files',
    }),
    NodemailerModule.forRoot(Config.nodeMailerOptions),
    AuthModule,
    ChatModule,
    ProfileModule,
    SingerModule,
    MusicianModule,
    FavoriteModule,
    PlaylistModule,
    SongModule,
    MusicModule,
    SingerAlbumModule,
    MusicianAlbumModule,
    TrackModule,
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
