import { IsOptional, IsString } from 'class-validator';
import { MusicType } from '../../../commons/enums/index.Enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMusicDto {
  @ApiProperty({ name: 'name', description: 'please enter user name ' })
  @IsString()
  @IsOptional()
  name?: string;
  @ApiProperty({ name: 'description', description: 'please enter user name ' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ name: 'artist', description: 'please enter user artist ' })
  @IsString()
  @IsOptional()
  artist?: string;
  @ApiProperty({
    name: 'type',
    enum: MusicType,
    description: 'please enter user artist ',
  })
  @IsOptional()
  type?: MusicType;
}
