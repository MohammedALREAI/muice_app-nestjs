import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { PassportModule } from '@nestjs/passport';
import { PlaylistRepository } from './playlist.repository';
import { TrackModule } from '../track/track.module';
import config from '../../config';


@Module({
  imports: [TypeOrmModule.forFeature([PlaylistRepository]),
  PassportModule.register({
    defaultStrategy: "jwt"
  }), TrackModule
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  //we need this to other section of code

  exports: [PlaylistService],
})
export class PlaylistModule {
}
