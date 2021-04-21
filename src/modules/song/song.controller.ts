import { UpdateSongDto } from './dto/updateSongDto';
import { GetByIdDto } from './../../commons/dto/getByID';
import { GetQueryFilteredSongDto } from './dto/getFilteredSongDto';
import { GetQuerySingers } from './../singer/dto/getFilteredSingersDto';
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
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SongService } from './song.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { SongType, SongLanguage } from '../../commons/enums/index.Enum';
import { Role } from 'src/commons/enums/index.Enum';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('songs')
@ApiTags('songs')
@ApiBearerAuth("JWT")
export class SongController {
  constructor(private songService: SongService) {}

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the song ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get()
  getAllSongs() {
    return this.songService.getAllSongs();
  }

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the song ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'the simple api Query',
  })
  @Get('limited')
  getLimitedSongs(@Query('limit') limit: number) {
    return this.songService.getLimitedSongs(limit);
  }

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the song ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiQuery({
    name: 'GetQuerySingers',
    type: GetQueryFilteredSongDto,
    description: 'the simple api Query',
  })
  @Get('filtered')
  getFilteredSongs(@Query('limit') getQuerySingers: GetQueryFilteredSongDto) {
    return this.songService.getFilteredSong(getQuerySingers);
  }

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the song ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({ name: 'id', type: GetByIdDto, description: 'get by id ' })
  @Get(':id')
  getSongById(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.songService.getSongById(id);
  }

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the song ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({ name: 'id', type: GetByIdDto, description: 'get by id ' })
  @Put(':id/update-song')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('source'))
  @ApiBody({ type: UpdateSongDto, description: 'the simple api UpdateSongDto' })
  updateSong(
    @Param('id', ParseIntPipe) { id }: GetByIdDto,
    @Body('updateSongDto') updateSongDto: UpdateSongDto,
    @UploadedFile() source: any,
  ) {
    return this.songService.updateSong(id, updateSongDto, source);
  }

  @Delete(':id/delete-song')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.songService.deleteSong(id);
  }

  @Post(':songId/add-to-playlist/:playlistId')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  addToPlaylist(
    @Param('songId', ParseIntPipe) songId: number,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ) {
    return this.songService.pushToPlaylist(songId, playlistId);
  }

  @Post(':songId/save-to-favorite-list/:favoriteId')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  saveToFavoriteList(
    @Param('songId', ParseIntPipe) songId: number,
    @Param('favoriteId', ParseIntPipe) favoriteId: number,
  ) {
    return this.songService.pushToFavoriteList(songId, favoriteId);
  }
}
