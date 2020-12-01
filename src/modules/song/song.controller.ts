import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,

} from '@nestjs/common';
import { SongService } from './song.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { updateSongType, UpdateSongDto } from './dto/updateSongDto';
import { GetFilteredSongDto } from './dto/getFilteredSongDto';
import { ParseIntPipeValidationPipe } from '../../commons/Pipes/parseintpipevalidation.pipe';
import { Role } from 'src/commons/enums/index.Enum';

@Controller('songs')
export class SongController {

  constructor(private songService: SongService) {

  }

  @Get()
  getAllSongs() {
    return this.songService.getAllSongs();
  }

  @Get('limited')
  getLimitedSongs(@Query('limit') limit: number) {
    return this.songService.getLimitedSongs(limit);
  }

  @Get('filtered')
  getFilteredSongs(@Query() getFilteredSongDto: GetFilteredSongDto) {
    return this.songService.getFilteredSong(getFilteredSongDto);
  }

  @Get(':id')
  getSongById(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.songService.getSongById(id);
  }


  @Put(':id/update-song')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('source'))
  updateSong(@Param('id', new ParseIntPipeValidationPipe()) id: number,
    @Body() updateSongDto: UpdateSongDto,
    @UploadedFile() source: any,
  ) {
    const updatedData: updateSongType = {
      id, ...updateSongDto, source
    }
    return this.songService.updateSong(updatedData);
  }

  @Delete(':id/delete-song')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  delete(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.songService.deleteSong(id);
  }

  @Post(':songId/add-to-playlist/:playlistId')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  addToPlaylist(@Param('songId', new ParseIntPipeValidationPipe()) songId: number,
    @Param('playlistId', new ParseIntPipeValidationPipe()) playlistId: number) {
    return this.songService.pushToPlaylist(songId, playlistId);
  }

  @Post(':songId/save-to-favorite-list/:favoriteId')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  saveToFavoriteList(@Param('songId', new ParseIntPipeValidationPipe()) songId: number,
    @Param('favoriteId', new ParseIntPipeValidationPipe()) favoriteId: number) {
    return this.songService.pushToFavoriteList(songId, favoriteId);
  }
}
