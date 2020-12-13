import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { PassportModule } from '@nestjs/passport';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TrackModule } from '../track/track.module';
import config from '../../config';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]),
  PassportModule.register({
    defaultStrategy: config().AuthJwt.strategies,
  }), TrackModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService]
})
export class FavoriteModule {
}
