import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongRepository } from './song.repository';
import { Song } from './song.entity';
import { SongType } from '../../commons/enums/song-type.enum';
import { SongLanguage } from '../../commons/enums/song-language.enum';
import { AwsService } from '../../shared/modules/aws/aws.service';
import { DeleteResult } from 'typeorm';
import { FavoriteService } from '../favorite/favorite.service';
import { Track } from '../track/track.entity';
import { PlaylistService } from '../playlist/playlist.service';
import { TrackService } from '../track/track.service';
import { updateSongType } from './dto/updateSongDto';
import { GetFilteredSongDto } from './dto/getFilteredSongDto';

@Injectable()
export class SongService {
  constructor(@InjectRepository(SongRepository) private songRepository: SongRepository,
    private awsService: AwsService,
    private favService: FavoriteService,
    private playlistService: PlaylistService,
    private trackService: TrackService) {
  }

  async getAllSongs(): Promise<Song[]> {
    return await this.songRepository.getAllSongs()
  }

  async getSongById(id: number): Promise<Song> {
    return await this.songRepository.getSongById(id)

  }

  async getFilteredSong(getFilteredSongDto: GetFilteredSongDto): Promise<Song[]> {
    return await this.songRepository.getFilteredSong(getFilteredSongDto)

  }

  async getLimitedSongs(limit: number): Promise<Song[]> {
    return await this.songRepository.getLimitedSongs(limit)

  }

  async updateSong(data: updateSongType): Promise<Song> {
    return await this.songRepository.updateSong(data)

  }

  async deleteSong(id: number): Promise<DeleteResult> {
    return await this.songRepository.deleteSong(id)

  }

  async pushToFavoriteList(songId: number, favoriteListId: number): Promise<Track> {
    return await this.songRepository.pushToFavoriteList(songId, favoriteListId)


  }

  async pushToPlaylist(songId: number, playlistId: number): Promise<Track> {
    return await this.songRepository.pushToPlaylist(songId, playlistId)


  }


}
