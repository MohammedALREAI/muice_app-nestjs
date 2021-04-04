import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianRepository } from './musician.repository';
import { MusicianController } from './musician.controller';
import { MusicianService } from './musician.service';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { PassportModule } from '@nestjs/passport';
import { MusicianAlbumModule } from '../musician-album/musician-album.module';
import { AuthJwt } from '../../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([MusicianRepository]),
    PassportModule.register({
      defaultStrategy: AuthJwt.strategies[0],
    }),
    AwsModule,
    MusicianAlbumModule,
  ],
  controllers: [MusicianController],
  providers: [MusicianService],
})
export class MusicianModule {}
