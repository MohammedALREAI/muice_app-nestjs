import { GetFilteredMusicsQuery } from './dto/getFilteredMusics.dto';
import { GetPlaylistIdDto } from './../../commons/dto/getByID';
import { UpdateMusicDto } from './dto/updateMusic';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { Role } from '../../commons/enums/index.Enum';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  GetByIdDto,
  GetByMusicIdDto,
  GetLimitDto,
} from '../../commons/dto/getByID';
@ApiTags("musics")
@Controller('musics')
@ApiBearerAuth("jwt or passport ")
export class MusicController {
  constructor(private musicService: MusicService) {}

  /** GET musics
   * getAllMusics
   * @returns
   */
 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the muisc ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get()
  getAllMusics() {
    return this.musicService.getAllMusics();
  }

  /** Get
   * getLimitedMusics
   * @param limit
   * @returns
   */
 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get getLimitedMusics ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiQuery({ name: 'limit', description: 'limited number' })
  @Get('limited')
  getLimitedMusics(@Query('limit') { limit }: GetLimitDto) {
    return this.musicService.getLimitedMusics(limit);
  }

  /**
   *
   * getFilteredMusics type and rate
   * @param param0
   * @param type
   * @param rate
   * @returns
   */

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the filtered ' })
  @ApiResponse({ description: 'Ok' })
  @ApiQuery({ name: 'getFilteredMusicsQuery', type:GetFilteredMusicsQuery, required: true })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('filtered')
  getFilteredMusics(
    @Query('getFilteredMusicsQuery') getFilteredMusicsQuery:GetFilteredMusicsQuery
  ) {
    const {limit,type,rate}=getFilteredMusicsQuery
    return this.musicService.getFilteredMusics(limit, type, rate);
  }

  /**
   * getMusicById()
   * @param  id
   * @returns
   */

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getMusicById ' })
  @ApiResponse({ description: 'Ok' })
  @ApiParam({
    name: 'id',
    description: 'id get by id ',
    required: true,
    type: GetByIdDto,
  })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get(':id')
  getMusicById(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.musicService.getMusicById(id);
  }

  /**
   *  updateMusic
   * @param id
   * @param updateMusics
   * @param source
   * @returns
   */

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'updateMusic  the muisc ' })
  @ApiResponse({ description: 'Ok' })
  @ApiParam({ name: 'id', description: 'id get by id ', required: true })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Put(':id/update-music')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('source'))
  updateMusic(
    @Param('id', ParseIntPipe) { id }: GetByIdDto,
    @Body('updateMusics') updateMusics: UpdateMusicDto,
    @UploadedFile() source: any,
  ) {
    const { name, description, artist, type } = updateMusics;
    return this.musicService.updateMusic(
      id,
      name,
      description,
      artist,
      type,
      source,
    );
  }

  /**
   *  deleteMusic
   * @param id
   * @returns
   */
 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the muisc ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with Enter cool  id  ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({ name: 'id', description: 'id get by id ', required: true })
  @Delete(':id/delete-music')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.musicService.deleteMusic(id);
  }

  /**
   * addToPlaylist
   * @param musicId
 
   * @param  playlistId
 
   * @returns 
   */
 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the muisc ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({
    name: 'playlistId',
    description: 'id get by id ',
    required: true,
  })
  @ApiParam({ name: 'musicId', description: 'id get by id ', required: true })
  @Post(':musicId/add-to-playlist/:playlistId')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  addToPlaylist(
    @Param('musicId') { musicId }: GetByMusicIdDto,
    @Param('playlistId', ParseIntPipe) { playlistId }: GetPlaylistIdDto,
  ) {
    return this.musicService.pushToPlaylist(musicId, playlistId);
  }

  /**
   *
   * @param param0
   * @param favoriteId
   * @returns
   */

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'saveToFavoriteList ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({ name: 'musicId', description: 'id get by id ', required: true })
  @Post(':musicId/save-to-favorite-list/:favoriteId')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles([Role.USER])
  saveToFavoriteList(
    @Param('musicId', ParseIntPipe) { musicId }: GetByMusicIdDto,
    @Param('favoriteId', ParseIntPipe) favoriteId: number,
  ) {
    return this.musicService.pushToFavoriteList(musicId, favoriteId);
  }
}
