import { Singer } from '../singer.entity';
import { GetFilteredSingers } from '../dto/getFilteredSingersDto';
import { CreateNewSingerDto } from '../dto/createNewSingerDto';
import { UpdateSingerDto } from '../dto/UpdateSingerDto';
import { DeleteResult } from 'typeorm';
import { CreateAlbumDto } from '../../singer-album/dto/create-album.dto';
import { SingerAlbum } from '../../singer-album/singer-album.entity';

export interface ISanger {
  getAllSingers(): Promise<Singer[]>;

  getSingerById(id: number): Promise<Singer>;

  getLimitedSingers(limit: number): Promise<Singer[]>;

  getFilteredSingers(getFilteredSingers: GetFilteredSingers): Promise<Singer[]>;

  createNewSinger(
    createNewSinger: CreateNewSingerDto,
    image: string,
  ): Promise<Singer>;

  updateSinger(updateSingerDto: UpdateSingerDto): Promise<Singer>;

  deleteSinger(singerId: number): Promise<DeleteResult>;

  createNewAlbum(
    singerId: number,
    createAlbumDto: CreateAlbumDto,
  ): Promise<SingerAlbum>;
}
