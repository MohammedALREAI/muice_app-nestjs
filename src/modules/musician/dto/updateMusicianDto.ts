import { PartialType } from '@nestjs/mapped-types';
import { CreateNewMusicianParams } from './createNewMusicianDto';
export class UpdateMusicianParams extends PartialType(CreateNewMusicianParams) { }
