import { Musician } from '../musician.entity';
import { ArtistType, Gender } from '../../../commons/enums/index.Enum';
import { CreateNewMusician } from '../dto/createNewMusicianDto';
import { DeleteResult } from 'typeorm';
import { CreateAlbumDto } from '../../singer-album/dto/create-album.dto';
import { MusicianAlbum } from '../../musician-album/musician-album.entity';
export type TGetFilteredMusicians = {
  limit: number,
  nationality: string,
  type: ArtistType,
  gender: Gender
}


export type TUpdateMusician = {
  id: number, name: string, info: string, gender: Gender, nationality: string,
  type: ArtistType, image: any
}
export interface IMusician {
  getAllMusicians(): Promise<Musician[]>
  getLimitedMusicians(limit: number): Promise<Musician[]>
  getFilteredMusicians(getFilteredMusicians: TGetFilteredMusicians): Promise<Musician[]>
  getMusicianById(id: number): Promise<Musician>
  createNewMusician(createNewMusician: CreateNewMusician): Promise<Musician>


  updateMusician(updateMusician: TUpdateMusician): Promise<Musician>


  deleteMusician(musicianId: number): Promise<DeleteResult>
  // implementation later
  createNewAlbum(musicianId: number, createAlbumDto: CreateAlbumDto): Promise<MusicianAlbum>
}
