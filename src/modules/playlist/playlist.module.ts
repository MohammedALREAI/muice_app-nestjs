import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { PassportModule } from '@nestjs/passport';
import { PlaylistRepository } from './playlist.repository';
import { TrackModule } from '../track/track.module';
import { AuthJwt } from '../../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistRepository]),
    PassportModule.register({
      defaultStrategy: AuthJwt.strategies[0],
    }),
    TrackModule,
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
