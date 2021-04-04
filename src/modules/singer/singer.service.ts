import {
  CreateNewSingerDto,
  UpdateNewSingerDto,
} from './dto/createNewSingerDto';
import { GetQuerySingers } from './dto/getFilteredSingersDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Singer } from './singer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SingerRepository } from './singer.repository';
import { ArtistType } from '../../commons/enums/index.Enum';
import { Gender } from '../../commons/enums/index.Enum';
import { CreateAlbumDto } from '../../shared/dto/create-album.dto';
import { SingerAlbum } from '../singer-album/singer-album.entity';
import { DeleteResult } from 'typeorm';
import { AwsService } from '../../shared/modules/aws/aws.service';
import { SingerAlbumService } from '../singer-album/singer-album.service';

@Injectable()
export class SingerService {
  constructor(
    @InjectRepository(SingerRepository)
    private singerRepository: SingerRepository,
    private awsService: AwsService,
    private singerAlbumService: SingerAlbumService,
  ) {}

  async getAllSingers(): Promise<Singer[]> {
    return await this.singerRepository.find();
  }

  async getLimitedSingers(limit: number): Promise<Singer[]> {
    return await this.singerRepository.getLimitedSingers(limit);
  }

  async getFilteredSingers(
    getQuerySingers: GetQuerySingers,
  ): Promise<Singer[]> {
    return await this.singerRepository.getFilteredSingers(getQuerySingers);
  }

  async getSingerById(id: number): Promise<Singer> {
    const singer = await this.singerRepository.findOne({
      where: { id },
    });
    if (!singer) {
      throw new NotFoundException(`Singer with id ${id} does not found`);
    }
    return singer;
  }

  async createNewSinger(
    createNewSinger: CreateNewSingerDto,
    image: any,
  ): Promise<Singer> {
    const { name, info, gender, type, nationality } = createNewSinger;
    const singer = new Singer();
    singer.name = name;
    singer.info = info;
    singer.gender = gender;
    singer.nationality = nationality;
    singer.type = type;
    singer.image = await this.awsService.fileUpload(image, 'singer-images');
    singer.singerAlbums = [];
    const savedSinger = await singer.save();
    return savedSinger;
  }

  async updateSinger(
    id: number,
    updateNewSingerDto: UpdateNewSingerDto,
    image: any,
  ): Promise<Singer> {
    const singer = await this.getSingerById(id);
    const { name, info, gender, nationality, type } = updateNewSingerDto;
    if (name) {
      singer.name = name;
    }
    if (info) {
      singer.info = info;
    }
    if (gender) {
      singer.gender = gender;
    }
    if (nationality) {
      singer.nationality = nationality;
    }
    if (type) {
      singer.type = type;
    }
    if (image) {
      await this.awsService.fileDelete(singer.image);
      singer.image = await this.awsService.fileUpload(image, 'singer-images');
    }
    const savedSinger = await singer.save();
    return singer;
  }

  async deleteSinger(singerId: number): Promise<DeleteResult> {
    const singer = await this.getSingerById(singerId);
    for (let i = 0; i < singer.singerAlbums.length; i++) {
      await this.singerAlbumService.deleteSingerAlbum(
        singer.singerAlbums[i].id,
      );
    }
    if (singer.image) {
      await this.awsService.fileDelete(singer.image);
    }
    const result = await this.singerRepository.delete(singerId);
    if (result.affected === 0) {
      throw new NotFoundException(`Singer with id ${singerId} does not found`);
    }
    return result;
  }

  async createNewAlbum(
    singerId: number,
    createAlbumDto: CreateAlbumDto,
  ): Promise<SingerAlbum> {
    const singer = await this.getSingerById(singerId);
    const singerAlbum = new SingerAlbum();
    const { name } = createAlbumDto;
    singerAlbum.name = name;
    singerAlbum.singer = singer; // this will create a foreign key
    singerAlbum.image = singer.image;
    const savedSingerAlbum = await singerAlbum.save();
    return savedSingerAlbum;
  }
}
