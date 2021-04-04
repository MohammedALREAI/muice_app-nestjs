import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class GetByIdDto {
  @ApiProperty({ name: 'id', required: true, description: 'id' })
  @IsNumber()
  @IsDefined()
  id: number;
}

export class GetByMusicIdDto {
  @ApiProperty({ name: 'id', required: true, description: 'id' })
  @IsNumber()
  @IsDefined()
  musicId: number;
}
export class GetByTrackIdDto {
  @ApiProperty({ name: 'id', required: true, description: 'id' })
  @IsNumber()
  @IsDefined()
  trackId: string;
}
export class GetPlaylistIdDto {
  @ApiProperty({ name: 'id', required: true, description: 'id' })
  @IsNumber()
  @IsDefined()
  playlistId: number;
}

export class GetLimitDto {
  @ApiProperty({ name: 'limit', required: true, description: 'limit' })
  @IsNumber()
  @IsDefined()
  limit: number;
}
