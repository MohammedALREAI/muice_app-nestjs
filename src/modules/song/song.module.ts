import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongRepository } from './song.repository';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { PassportModule } from '@nestjs/passport';
import { PlaylistModule } from '../playlist/playlist.module';
import { TrackModule } from '../track/track.module';
import { AuthJwt } from '../../config';

@Module({
  imports: [TypeOrmModule.forFeature([SongRepository]),
    AwsModule, FavoriteModule, PassportModule.register({
      defaultStrategy: AuthJwt.strategies[0],
    }), PlaylistModule, TrackModule],
  controllers: [SongController],
  providers: [SongService],
  exports: [SongService]
})
export class SongModule {
}
