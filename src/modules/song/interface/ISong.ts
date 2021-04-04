import { Track } from '../../track/track.entity';
import { GetFilteredSongDto } from '../dto/getFilteredSongDto';
import { Song } from '../song.entity';
export interface ISong {
  pushToPlaylist(songId: number, playlistId: number): Promise<Track>;

  pushToFavoriteList(songId: number, favoriteListId: number): Promise<Track>;
  getLimitedSongs(limit: number): Promise<Song[]>;
  getFilteredSong(getFilteredSongDto: GetFilteredSongDto): Promise<Song[]>;
}
