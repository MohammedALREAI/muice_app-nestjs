import { GetQueryFilteredSongDto } from './../dto/getFilteredSongDto';
import { Track } from '../../track/track.entity';
import { Song } from '../song.entity';
export interface ISong {
   pushToPlaylist(songId: number, playlistId: number): Promise<Track> 
    pushToFavoriteList(songId: number,favoriteListId: number): Promise<Track> 

       getLimitedSongs(limit: number): Promise<Song[]> 
         getFilteredSong(
          getQuerySingers: GetQueryFilteredSongDto,
        ): Promise<Song[]> 
      }
