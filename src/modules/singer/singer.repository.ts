import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Singer } from './singer.entity';
import { ArtistType, Gender } from '../../commons/enums/index.Enum';
import { CreateNewSingerDto } from './dto/createNewSingerDto';
import { AwsService } from '../../shared/modules/aws/aws.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateSingerDto } from './dto/UpdateSingerDto';
import { SingerAlbumService } from '../singer-album/singer-album.service';
import { SingerAlbum } from '../singer-album/singer-album.entity';
import { CreateAlbumDto } from '../../shared/dto/create-album.dto';
import { GetFilteredSingers } from './dto/getFilteredSingersDto';

//  when we will be used the  app  we need to injection it
// this is a provider
@EntityRepository(Singer)
export class SingerRepository extends Repository<Singer> {

  constructor(private awsService: AwsService,
    private singerAlbumService: SingerAlbumService) {
    super()
  }


  async getLimitedSingers(limit: number): Promise<Singer[]> {
    try {
      const query = this.createQueryBuilder('singer').select();
      if (limit) {
        query.limit(limit);
      }
      const singers = await query.leftJoinAndSelect('singer.singerAlbums', 'singer-album').getMany();
      return singers;

    } catch (e) {
      throw new BadRequestException(`there are some error ${e}`)


    }

  }

  async getFilteredSingers(getFilteredSingers: GetFilteredSingers): Promise<Singer[]> {
    const { limit, gender, nationality, type } = getFilteredSingers
    const query = this.createQueryBuilder('singer').select();
    if (limit) {
      query.limit(limit);
    }
    if (nationality) {
      query.where('singer.nationality LIKE :nationality', { nationality });
    }
    if (type) {
      query.andWhere('singer.type = :type', { type });
    }
    if (gender) {
      query.andWhere('singer.gender = :gender', { gender });
    }
    const singers = await query.leftJoinAndSelect('singer.singerAlbums', 'singer-albums').getMany();
    return singers;
  }

  async createNewSinger(createNewSinger: CreateNewSingerDto, image: any): Promise<Singer> {
    const { name, info, gender, type, nationality } = createNewSinger

    try {
      const singerAlbums = [];
      const res = await this.create({
        name,
        info,
        gender,
        type,
        nationality,
        singerAlbums,
        image
      }).save()
      if (!res) {
        throw new BadRequestException('there are some error in data')
      }
      return res


    } catch (e) {
      throw new BadRequestException(`there are some error ${e}`)


    }


  }


  async getAllSingers(): Promise<Singer[]> {
    try {
      const res = await this.find();
      if (res) {
        return res
      }
      throw new NotFoundException('the singerRepository not found any items ')

    } catch (e) {
      throw new BadRequestException(`there are some error ${e}`)

    }
  }


  async getSingerById(id: number): Promise<Singer> {
    try {
      const singer = await this.findOne(id);

      if (!singer) {
        throw new NotFoundException(`Singer with id ${id} does not found`);
      }
      return singer;
    } catch (e) {
      throw new BadRequestException(`there are some error ${e}`)


    }
  }



  async updateSinger(updateSingerDto: UpdateSingerDto): Promise<Singer> {
    const { name, id, info, gender, image, type, nationality } = updateSingerDto
    const singer = await this.getSingerById(id);
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
    return await singer.save();
  }



  async deleteSinger(singerId: number): Promise<DeleteResult> {
    const singer = await this.getSingerById(singerId);
    for (let i = 0; i < singer.singerAlbums.length; i++) {
      await this.singerAlbumService.deleteSingerAlbum(singer.singerAlbums[i].id);
    }
    if (singer.image) {
      await this.awsService.fileDelete(singer.image);
    }
    const result = await this.delete(singerId);
    if (result.affected === 0) {
      throw new NotFoundException(`Singer with id ${singerId} does not found`);
    }
    return result;
  }




  async createNewAlbum(singerId: number, createAlbumDto: CreateAlbumDto): Promise<SingerAlbum> {
    const singer = await this.getSingerById(singerId);
    const singerAlbum = new SingerAlbum();
    const { name } = createAlbumDto;
    singerAlbum.name = name;
    singerAlbum.singer = singer;// this will create a foreign key
    singerAlbum.image = singer.image;
    const savedSingerAlbum = await singerAlbum.save();
    return savedSingerAlbum;
  }



}
