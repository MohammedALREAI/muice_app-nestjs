import { Favorite } from '../../favorite/favorite.entity';
import { Music } from '../../music/music.entity';
import { Song } from '../../song/song.entity';
import { DeleteResult } from 'typeorm';
import { Playlist } from '../../playlist/playlist.entity';
import { Track } from '../track.entity';

export interface ITaskService {
  pushToFavoriteList(
    song: Song,
    music: Music,
    favorite: Favorite,
  ): Promise<Track>;
  pushToPlaylist(song: Song, music: Music, playlist: Playlist): Promise<Track>;
  deleteTrack(id: number): Promise<DeleteResult>;
  checkTrackType(track: Track, song: Song, music: Music): Track;
}
