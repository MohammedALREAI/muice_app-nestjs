import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';


@Controller('tracks')
export class TrackController {

  constructor(@InjectRepository(Track) private trackRepository: Repository<Track>) {
  }

  @Get()
  async getTracks() {
    return await this.trackRepository.find();
  }


}
