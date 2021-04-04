import { SingerAlbum } from '../singer-album.entity';
import { CreateNewSongDto } from '../dto/createNewSongDto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { DeleteResult } from 'typeorm';
export interface ISangerAlbum {
  getAllSingerAlbums(): Promise<SingerAlbum[]>;
  getSingerAlbumById(id: number): Promise<SingerAlbum>;
  createNewSong(createNewSongDto: CreateNewSongDto);
  updateSingerAlbum(
    id: number,
    createAlbumDto: CreateAlbumDto,
  ): Promise<SingerAlbum>;
  deleteSingerAlbum(id: number): Promise<DeleteResult>;
  clearSingerAlbum(id: number): Promise<SingerAlbum>;
}
