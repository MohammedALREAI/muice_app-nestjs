import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { SingerAlbum } from './singer-album.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Song } from '../song/song.entity';
import { CreateNewSongDto } from './dto/createNewSongDto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { SongService } from '../song/song.service';
import { AwsService } from '../aws/aws.service';

//  when we will be used the  app  we need to injection it
// this is a provider
@EntityRepository(SingerAlbum)
export class SingerAlbumsRepository extends Repository<SingerAlbum> {
  constructor(
    private awsService: AwsService,
    private songService: SongService,
  ) {
    super();
  }

  async getAllSingerAlbums(): Promise<SingerAlbum[]> {
    try {
      const res = await this.find();
      if (!res) {
        throw new NotFoundException(
          'the singerRepository not found any items ',
        );
      }

      return res;
    } catch (e) {
      throw new BadRequestException(`there are some error ${e}`);
    }
  }

  async getSingerAlbumById(id: number): Promise<SingerAlbum> {
    try {
      const singerAlbum = await this.findOne({ id });
      if (!singerAlbum) {
        throw new NotFoundException(
          `Singer Album with id ${id} does not found`,
        );
      }
      return singerAlbum;
    } catch (e) {
      throw new BadRequestException(`there are some error ${e}`);
    }
  }

  async createNewSong(createNewSongDto: CreateNewSongDto): Promise<Song> {
    const {
      artist,
      description,
      language,
      name,
      singerAlbumId,
      type,
      source,
    } = createNewSongDto;
    const song = new Song();
    try {
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
    } catch (e) {
      throw new BadRequestException(`there are some error ${e}`);
    }
  }

  async updateSingerAlbum(
    id: number,
    createAlbumDto: CreateAlbumDto,
  ): Promise<SingerAlbum> {
    const singerAlbum = await this.getSingerAlbumById(id);
    const { name } = createAlbumDto;
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
    const result = await this.delete(id);
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
