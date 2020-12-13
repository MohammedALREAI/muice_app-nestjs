import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SongType, SongLanguage, Role } from '../../commons/enums/index.Enum';
import { SingerAlbumService } from './singer-album.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { CreateNewSongDto } from './dto/createNewSongDto';
import { ParseIntPipeValidationPipe } from '../../commons/Pipes/parseintpipevalidation.pipe';
type BodyCreateNewSong = Omit<CreateNewSongDto, 'source' | 'singerAlbumId'>

@Controller('singers-albums')
export class SingerAlbumController {

  constructor(private singerAlbumService: SingerAlbumService) {
  }

  @Get()
  getAllSingerAlbums() {
    return this.singerAlbumService.getAllSingerAlbums();
  }

  @Get(':id')
  getSingerAlbum(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.singerAlbumService.getSingerAlbumById(id);
  }

  @Post(':id/new-song')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('source'))
  createNewSong(@Param('id', new ParseIntPipeValidationPipe()) id: number,
    @Body() bodyCreateNewSong: BodyCreateNewSong,
    @UploadedFile() source: any,
  ) {
    const { name, description, artist, type, language, } = bodyCreateNewSong
    const createNewSongDto: CreateNewSongDto = { singerAlbumId: id, name, description, artist, type, language, source }
    return this.singerAlbumService.createNewSong(createNewSongDto);
  }

  @Put(':id/update-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  updateAlbum(@Param('id', new ParseIntPipeValidationPipe()) id: number, @Body() createAlbumDto: CreateAlbumDto) {
    return this.singerAlbumService.updateSingerAlbum(id, createAlbumDto);
  }

  @Delete(':id/delete-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  deleteAlbum(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.singerAlbumService.deleteSingerAlbum(id);
  }


  @Delete(':id/clear-singer-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  clearSingerAlbum(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.singerAlbumService.clearSingerAlbum(id);
  }
}
