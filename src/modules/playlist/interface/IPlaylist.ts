import { User } from '../../auth/entities/user.entity';
import { Playlist } from '../playlist.entity';
import { PlaylistDto } from '../dto/playlist.dto';
import { DeleteResult } from 'typeorm';
import { Song } from '../../song/song.entity';
import { Music } from '../../music/music.entity';
export interface IPlaylist {
  getUserPlaylists(user: User): Promise<Playlist[]>;

  getPlaylistById(id: number): Promise<Playlist>;

  newPlaylist(user: User, playlistDto: PlaylistDto): Promise<Playlist>;

  updatePlaylist(id: number, playlistDto: PlaylistDto): Promise<Playlist>;

  deletePlaylist(id: number): Promise<DeleteResult>;

  clearPlaylistContent(id: number): Promise<Playlist>;

  removeTrackFromPlaylist(
    playlistId: number,
    trackId: number,
  ): Promise<Playlist>;

  createPlaylistTrack(song: Song, music: Music, playlistId: number);
}
