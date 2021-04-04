import { CreateNewSingerDto } from './../dto/createNewSingerDto';
import { GetQuerySingers } from './../dto/getFilteredSingersDto';
import { Singer } from '../singer.entity';
import { DeleteResult } from 'typeorm';
import { CreateAlbumDto } from '../../singer-album/dto/create-album.dto';
import { SingerAlbum } from '../../singer-album/singer-album.entity';

export interface ISanger {
  getAllSingers(): Promise<Singer[]>;

  getSingerById(id: number): Promise<Singer>;

  getLimitedSingers(limit: number): Promise<Singer[]>;

  getFilteredSingers(    getQuerySingers: GetQuerySingers    ): Promise<Singer[]>;

  createNewSinger(
    createNewSinger: CreateNewSingerDto,
    image: string,
  ): Promise<Singer>;
 
   createNewSinger(
    createNewSinger: CreateNewSingerDto,
    image: any,
): Promise<Singer>;

  deleteSinger(singerId: number): Promise<DeleteResult>;

  createNewAlbum(
    singerId: number,
    createAlbumDto: CreateAlbumDto,
  ): Promise<SingerAlbum>;
}
