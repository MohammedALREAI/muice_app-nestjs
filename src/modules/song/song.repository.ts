import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Song } from './song.entity';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GetFilteredSongDto } from './dto/getFilteredSongDto';
import { updateSongType } from './dto/updateSongDto';
import { AwsService } from '../../shared/modules/aws/aws.service';
import { FavoriteService } from '../favorite/favorite.service';
import { PlaylistService } from '../playlist/playlist.service';
import { TrackService } from '../track/track.service';
import { Track } from '../track/track.entity';

@EntityRepository(Song)
export class SongRepository extends Repository<Song>{
  constructor(private awsService: AwsService,
    private favService: FavoriteService,
    private playlistService: PlaylistService,
    private trackService: TrackService) {
    super()
  }


  async getLimitedSongs(limit: number): Promise<Song[]> {
    const query = this.createQueryBuilder('song').select();
    if (limit) {
      query.limit(limit);
    }
    const songs = await query.leftJoinAndSelect('song.tracks', 'track').getMany();
    return songs;
  }

  async getFilteredSongs(getFilteredSongDto: GetFilteredSongDto): Promise<Song[]> {
    const { limit, type, language, rate } = getFilteredSongDto

    const query = this.createQueryBuilder('song').select();
    if (limit) {
      query.limit(limit);
    }
    if (type) {
      query.where('song.type = :type', { type });
    }
    if (language) {
      query.andWhere('song.language = :language', { language });
    }
    if (rate) {
      query.andWhere('song.rate = :rate', { rate });
    }
    const songs = await query.leftJoinAndSelect('song.tracks', 'track').getMany();
    return songs;
  }




  async getAllSongs(): Promise<Song[]> {
    try {
      const allSong = await this.find();
      if (allSong) {
        return allSong
      }
      throw new NotFoundException('there is no song found ')
    } catch (e) {
      throw new InternalServerErrorException(`there are some error in server ${e}`)


    }
  }
  async getSongById(id: number): Promise<Song> {

    try {
      const song = await this.findOne({ id })
      if (!song) {
        throw new NotFoundException(`Song with id ${id} does not found`);

      }
      return song;

    } catch (e) {
      throw new InternalServerErrorException(`there are some error in server ${e}`)
    }
  }

  async getFilteredSong(getFilteredSongDto: GetFilteredSongDto): Promise<Song[]> {
    try {
      const filterSong = await this.getFilteredSongs(getFilteredSongDto);
      if (!filterSong) {
        throw new NotFoundException('there is no song found with the special chiastic')
      }
      return filterSong;
    } catch (e) {
      throw new InternalServerErrorException(`there are some error in server ${e}`)

    }
  }









  async updateSong(data: updateSongType): Promise<Song> {
    const { id, name, description, artist, language, source, type } = data
    const song = await this.getSongById(id);
    if (name) {
      song.name = name;
    }
    if (description) {
      song.description = description;
    }
    if (artist) {
      song.artist = artist;
    }
    if (type) {
      song.type = type;
    }
    if (language) {
      song.language = language;
    }
    if (source) {
      await this.awsService.fileDelete(song.source);
      song.source = await this.awsService.fileUpload(source, 'songs');
    }
    const updatedSong = await song.save();
    return updatedSong;
  }

  async deleteSong(id: number): Promise<DeleteResult> {

    const song = await this.getSongById(id);
    for (let i = 0; i < song.tracks.length; i++) {
      await this.trackService.deleteTrack(song.tracks[i].id);
    }
    if (song.source) {
      await this.awsService.fileDelete(song.source);
    }
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Song with id ${id} does not found`);
    }
    return result;
  }

  async pushToFavoriteList(songId: number, favoriteListId: number): Promise<Track> {
    const song = await this.getSongById(songId);
    const track = await this.favService.createFavoriteTrack(song, null, favoriteListId);
    return track;
  }

  async pushToPlaylist(songId: number, playlistId: number): Promise<Track> {
    const song = await this.getSongById(songId);
    const track = await this.playlistService.createPlaylistTrack(song, null, playlistId);
    return track;
  }








}
