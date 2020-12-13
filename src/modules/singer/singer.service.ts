import { Injectable } from '@nestjs/common';
import { Singer } from './singer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SingerRepository } from './singer.repository';
import { CreateAlbumDto } from '../singer-album/dto/create-album.dto';
import { SingerAlbum } from '../singer-album/singer-album.entity';
import { DeleteResult } from 'typeorm';
import { CreateNewSingerDto } from './dto/createNewSingerDto';
import { UpdateSingerDto } from './dto/UpdateSingerDto';
import { GetFilteredSingers } from './dto/getFilteredSingersDto';
import { ISanger } from './interface/ISinger';

@Injectable()
export class SingerService implements ISanger {

  constructor(@InjectRepository(SingerRepository) private singerRepository: SingerRepository) {
  }
  //  # done
  async getAllSingers(): Promise<Singer[]> {
    return await this.singerRepository.getAllSingers()
  }
  //  # done

  async getSingerById(id: number): Promise<Singer> {
    return this.singerRepository.getSingerById(id)
  }
  //  # done



  async getLimitedSingers(limit: number): Promise<Singer[]> {
    return await this.singerRepository.getLimitedSingers(limit);
  }

  async getFilteredSingers(getFilteredSingers: GetFilteredSingers): Promise<Singer[]> {
    return await this.singerRepository.getFilteredSingers(getFilteredSingers);
  }


  async createNewSinger(createNewSinger: CreateNewSingerDto, image: string): Promise<Singer> {
    return await this.singerRepository.createNewSinger(createNewSinger, image)
  }

  async updateSinger(updateSingerDto: UpdateSingerDto): Promise<Singer> {
    return await this.singerRepository.updateSinger(updateSingerDto)

  }

  async deleteSinger(singerId: number): Promise<DeleteResult> {
    return await this.singerRepository.deleteSinger(singerId)
  }

  async createNewAlbum(singerId: number, createAlbumDto: CreateAlbumDto): Promise<SingerAlbum> {
    return await this.singerRepository.createNewAlbum(singerId, createAlbumDto)
  }

}
