import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingerAlbum } from './singer-album.entity';
import { DeleteResult } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { SingerAlbumsRepository } from './singer-albums.repostory';
import { CreateNewSongDto } from './dto/createNewSongDto';
import { ISangerAlbum } from './interface/ISinger';

@Injectable()
export class SingerAlbumService implements ISangerAlbum {

  constructor(@InjectRepository(SingerAlbum) private singerAlbumRepository: SingerAlbumsRepository) {
  }


  async getAllSingerAlbums(): Promise<SingerAlbum[]> {
    return await this.singerAlbumRepository.find();
  }

  async getSingerAlbumById(id: number): Promise<SingerAlbum> {
    return await this.singerAlbumRepository.getSingerAlbumById(id);

  }

  async createNewSong(createNewSongDto: CreateNewSongDto) {
    return await this.singerAlbumRepository.createNewSong(createNewSongDto)

  }

  async updateSingerAlbum(id: number, createAlbumDto: CreateAlbumDto): Promise<SingerAlbum> {
    return await this.singerAlbumRepository.updateSingerAlbum(id, createAlbumDto)

  }

  async deleteSingerAlbum(id: number): Promise<DeleteResult> {
    return await this.singerAlbumRepository.deleteSingerAlbum(id)

  }

  async clearSingerAlbum(id: number): Promise<SingerAlbum> {
    return await this.singerAlbumRepository.clearSingerAlbum(id)


  }
}
