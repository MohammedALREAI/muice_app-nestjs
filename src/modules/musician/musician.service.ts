import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from '../../shared/modules/aws/aws.service';
import { DeleteResult } from 'typeorm';
import { CreateAlbumDto } from '../singer-album/dto/create-album.dto';
import { MusicianRepository } from './musician.repository';
import { Musician } from './musician.entity';
import { MusicianAlbum } from '../musician-album/musician-album.entity';
import { MusicianAlbumService } from '../musician-album/musician-album.service';
import { IMusician, TGetFilteredMusicians, TUpdateMusician } from './interface/IMusician';
import { CreateNewMusician } from './dto/createNewMusicianDto';

@Injectable()
export class MusicianService implements IMusician {
  constructor(@InjectRepository(MusicianRepository) private musicianRepository: MusicianRepository,
    private awsService: AwsService,
    private musicianAlbumService: MusicianAlbumService) {
  }

  async getAllMusicians(): Promise<Musician[]> {
    return await this.musicianRepository.find();
  }

  async getLimitedMusicians(limit: number): Promise<Musician[]> {
    return await this.musicianRepository.getLimitedMusicians(limit);
  }

  async getFilteredMusicians(getFilteredMusicians: TGetFilteredMusicians): Promise<Musician[]> {
    const { limit, nationality, type, gender } = getFilteredMusicians
    return await this.musicianRepository.getFilteredMusicians(limit, nationality, type, gender);
  }

  async getMusicianById(id: number): Promise<Musician> {
    const musician = await this.musicianRepository.findOne({
      where: { id },
    });
    if (!musician) {
      throw new NotFoundException(`Musician with id ${id} does not found`);
    }
    return musician;
  }

  async createNewMusician(createNewMusician: CreateNewMusician): Promise<Musician> {
    const { image, name, info, gender, type, nationality } = createNewMusician
    const myImage = await this.awsService.fileUpload(image, 'musician-images');
    const musician = {
      name,
      info,
      gender,
      nationality,
      type,
      musicianAlbums: [],
      image: myImage

    } as Musician
    const savedMusician = await musician.save();
    return savedMusician;
  }

  async updateMusician(updateMusician: TUpdateMusician): Promise<Musician> {
    const { id, image, name, info, gender, type, nationality } = updateMusician
    const musician = await this.getMusicianById(id);
    if (name) {
      musician.name = name;
    }
    if (info) {

      musician.info = info;
    }
    if (gender) {
      musician.gender = gender;
    }
    if (nationality) {
      musician.nationality = nationality;
    }
    if (type) {
      musician.type = type;
    }
    if (image) {
      await this.awsService.fileDelete(musician.image);
      musician.image = await this.awsService.fileUpload(image, 'musician-images');
    }
    const savedMusician = await musician.save();
    return savedMusician;
  }

  async deleteMusician(musicianId: number): Promise<DeleteResult> {
    const musician = await this.getMusicianById(musicianId);
    if (musician.image) {
      await this.awsService.fileDelete(musician.image);
    }
    for (let i = 0; i < musician.musicianAlbums.length; i++) {
      await this.musicianAlbumService.deleteMusicianAlbum(musician.musicianAlbums[i].id)
    }
    const result = await this.musicianRepository.delete(musicianId);
    if (result.affected === 0) {
      throw new NotFoundException(`Musician with id ${musicianId} does not found`);
    }
    return result;
  }

  // implementation later
  async createNewAlbum(musicianId: number, createAlbumDto: CreateAlbumDto): Promise<MusicianAlbum> {
    const musician = await this.getMusicianById(musicianId);
    const musicianAlbum = new MusicianAlbum();
    const { name } = createAlbumDto;
    musicianAlbum.name = name;
    musicianAlbum.musician = musician;// this will create a foreign key
    musicianAlbum.image = musician.image;

    musicianAlbum.musics = []; // updated

    const savedSingerAlbum = await musicianAlbum.save();
    return savedSingerAlbum;
  }
}
