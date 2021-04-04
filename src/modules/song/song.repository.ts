import { GetQueryFilteredSongDto } from './dto/getFilteredSongDto';
import { EntityRepository, Repository } from 'typeorm';
import { Song } from './song.entity';

@EntityRepository(Song)
export class SongRepository extends Repository<Song> {
  async getLimitedSongs(limit: number): Promise<Song[]> {
    const query = this.createQueryBuilder('song').select();
    if (limit) {
      query.limit(limit);
    }
    const songs = await query
      .leftJoinAndSelect('song.tracks', 'track')
      .getMany();
    return songs;
  }

  async getFilteredSongs(
    getQuerySingers: GetQueryFilteredSongDto,
  ): Promise<Song[]> {
    const { limit, type, language, rate } = getQuerySingers;
    const query = this.createQueryBuilder('song').select();
    if (limit) {
      query.limit(limit);
    }
    if (type) {
      query.where('song.type = :type', { type });
    }
    if (language) {
      query.andWhere('song.language = :language', { language });
    }
    if (rate) {
      query.andWhere('song.rate = :rate', { rate });
    }
    const songs = await query
      .leftJoinAndSelect('song.tracks', 'track')
      .getMany();
    return songs;
  }
}
