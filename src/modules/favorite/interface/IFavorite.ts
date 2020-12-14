import { Favorite } from '../favorite.entity';
import { Profile } from '../../profile/profile.entity';
import { Music } from '../../music/music.entity';
import { Song } from '../../song/song.entity';
export interface IFavorite {
  getUserFavoriteList(id: number, profile?: Profile): Promise<Favorite>
  deleteFavoriteList(id: number): Promise<void>
  clearFavoriteListContent(id: number): Promise<Favorite>
  removeTrackFromFavouriteList(favouriteId: number, trackId: number): Promise<Favorite>
  createFavoriteTrack(song: Song, music: Music, favoriteListId: number)

}
