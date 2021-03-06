import { CreateNewSongDto } from './dto/createNewSongDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingerAlbum } from './singer-album.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Song } from '../song/song.entity';
import { SongType, SongLanguage } from '../../commons/enums/index.Enum';
import { AwsService } from '../../shared/modules/aws/aws.service';
import { CreateAlbumDto } from '../../shared/dto/create-album.dto';
import { SongService } from '../song/song.service';
import { UpdateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class SingerAlbumService {
  constructor(
    @InjectRepository(SingerAlbum)
    private singerAlbumRepository: Repository<SingerAlbum>,
    private awsService: AwsService,
    private songService: SongService,
  ) {}

  async getAllSingerAlbums(): Promise<SingerAlbum[]> {
    return await this.singerAlbumRepository.find();
  }

  async getSingerAlbumById(id: number): Promise<SingerAlbum> {
    const singerAlbum = await this.singerAlbumRepository.findOne({
      where: {
        id,
      },
    });
    if (!singerAlbum) {
      throw new NotFoundException(`Singer Album with id ${id} does not found`);
    }
    return singerAlbum;
  }

  async createNewSong(
    singerAlbumId: number,
    createNewSongDto: CreateNewSongDto,
    source: any,
  ): Promise<Song> {
    const { name, description, artist, language, type } = createNewSongDto;
    const song = new Song();
    const singerAlbum = await this.getSingerAlbumById(singerAlbumId);
    song.name = name;
    song.description = description;
    song.artist = artist;
    song.type = type;
    song.language = language;
    song.tempImage = singerAlbum.image;
    song.source = await this.awsService.fileUpload(source, 'songs');
    song.singerAlbum = singerAlbum;
    const savedSong = await song.save();
    return savedSong;
  }

  async updateSingerAlbum(
    id: number,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<SingerAlbum> {
    const singerAlbum = await this.getSingerAlbumById(id);
    const { name } = updateAlbumDto;
    if (name) {
      singerAlbum.name = name;
    }
    const savedSingerAlbum = await singerAlbum.save();
    return savedSingerAlbum;
  }

  async deleteSingerAlbum(id: number): Promise<DeleteResult> {
    const singerAlbum = await this.getSingerAlbumById(id);
    for (let i = 0; i < singerAlbum.songs.length; i++) {
      await this.songService.deleteSong(singerAlbum.songs[i].id);
    }
    const result = await this.singerAlbumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Singer Album with id ${id} does not found`);
    }
    return result;
  }

  async clearSingerAlbum(id: number): Promise<SingerAlbum> {
    const singerAlbum = await this.getSingerAlbumById(id);
    for (let i = 0; i < singerAlbum.songs.length; i++) {
      await this.songService.deleteSong(singerAlbum.songs[i].id);
    }
    singerAlbum.songs = [];
    return await singerAlbum.save();
  }
}
