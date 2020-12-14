import { Music } from '../music.entity';
import { DeleteResult } from 'typeorm';
import { Track } from '../../track/track.entity';
import { MusicType } from '../../../commons/enums/index.Enum';
export interface IMusic {
  getLimitedMusics(limit: number): Promise<Music[]>
  pushToFavoriteList(musicId: number, favoriteListId: number): Promise<Track>
  deleteMusic(id: number): Promise<DeleteResult>
  pushToPlaylist(musicId: number, playlistId: number): Promise<Track>
  updateMusic(id: number, name: string, description: string,
    artist: string, type: MusicType, source: any): Promise<Music>
  getFilteredMusics(limit: number, type: MusicType, rate: number): Promise<Music[]>
  

  getMusicById(id: number): Promise<Music>


  getAllMusics(): Promise<Music[]>

}
