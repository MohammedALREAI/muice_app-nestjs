import { MusicianAlbum } from '../musician-album.entity';
import { CreateAlbumDto } from '../../singer-album/dto/create-album.dto';
import { DeleteResult } from 'typeorm';
import { Music } from '../../music/music.entity';
import { CreateMusicDto } from '../dto/createNewMusicDto';
export interface IMusicianAlbum {
  getAllMusicianAlbums(): Promise<MusicianAlbum[]>

  getMusicianAlbumById(id: number): Promise<MusicianAlbum>

  createNewMusic(createMusicDto: CreateMusicDto): Promise<Music>
  updateMusicianAlbum(id: number, createAlbumDto: CreateAlbumDto): Promise<MusicianAlbum>
  deleteMusicianAlbum(id: number): Promise<DeleteResult>






}
