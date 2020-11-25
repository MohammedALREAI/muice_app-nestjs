import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseArrayPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MusicType } from '../../commons/enums/music-type.enum';
import { MusicService } from './music.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { Role } from '../../commons/enums/role.enum';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { UpdateMusicDto } from './dto/updateMusic';
import { HttpStatus } from '@nestjs/common';
import { ParseIntPipeValidationPipe } from '../../commons/Pipes/parseintpipevalidation.pipe';

@Controller('musics')
export class MusicController {
  constructor(private readonly musicService: MusicService) {

  }

  @Get()
  getAllMusics() {
    return this.musicService.getAllMusics();
  }

  @Get('limited')
  getLimitedMusics(@Query('limit') limit: number) {
    return this.musicService.getLimitedMusics(limit);
  }

  @Get('filtered')
  getFilteredMusics(@Query('limit') limit: number,
    @Query('type') type: MusicType,
    @Query('rate') rate: number) {
    return this.musicService.getFilteredMusics(limit, type, rate);
  }

  @Get(':id')
  getMusicById(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.musicService.getMusicById(id);
  }

  @Put(':id/update-music')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('source'))
  updateMusic(@Param('id', new ParseIntPipeValidationPipe()) id: number,
    @Body() body: UpdateMusicDto,
    @UploadedFile() source: any) {
    const { description, artist, type, name } = body
    return this.musicService.updateMusic(id, name, description, artist, type, source);
  }

  @Delete(':id/delete-music')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  delete(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.musicService.deleteMusic(id);
  }

  @Post(':musicId/add-to-playlist/:playlistId')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  addToPlaylist(@Param('musicId', new ParseIntPipeValidationPipe()) musicId: number,
    @Param('playlistId', new ParseIntPipeValidationPipe()) playlistId: number) {
    return this.musicService.pushToPlaylist(musicId, playlistId);
  }

  @Post(':musicId/save-to-favorite-list/:favoriteId')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  saveToFavoriteList(@Param('musicId', new ParseIntPipeValidationPipe()) musicId: number,
    @Param('favoriteId', new ParseIntPipeValidationPipe()) favoriteId: number) {
    return this.musicService.pushToFavoriteList(musicId, favoriteId);
  }
}












