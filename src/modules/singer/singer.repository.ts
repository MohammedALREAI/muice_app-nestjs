import { GetQuerySingers } from './dto/getFilteredSingersDto';
import { EntityRepository, Repository } from 'typeorm';
import { Singer } from './singer.entity';

// this is a provider
@EntityRepository(Singer)
export class SingerRepository extends Repository<Singer> {
  async getLimitedSingers(limit: number): Promise<Singer[]> {
    const query = this.createQueryBuilder('singer').select();
    if (limit) {
      query.limit(limit);
    }
    const singers = await query
      .leftJoinAndSelect('singer.singerAlbums', 'singer-album')
      .getMany();
    return singers;
  }

  async getFilteredSingers(
    getQuerySingers: GetQuerySingers,
  ): Promise<Singer[]> {
    const { limit, nationality, type, gender } = getQuerySingers;
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
    const singers = await query
      .leftJoinAndSelect('singer.singerAlbums', 'singer-albums')
      .getMany();
    return singers;
  }
}
