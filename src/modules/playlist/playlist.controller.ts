import { GetByIdDto } from './../../commons/dto/getByID';
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
  UseGuards,
} from '@nestjs/common';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from '../auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { Role } from '../../commons/enums/index.Enum';
import { PlaylistDto, UpdatePlayListDto } from './dto/playlist.dto';
import { PlaylistService } from './playlist.service';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiParam,
} from '@nestjs/swagger';

@UseGuards(AuthGuard(), UserAuthGuard)
@Roles([Role.USER])
@Controller('playlists')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @ApiTags('playlists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('user-playlists')
  getAllUserPlaylists(@GetAuthenticatedUser() user: User) {
    return this.playlistService.getUserPlaylists(user);
  }

  @ApiTags('playlists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({
    name: 'id',
    description: 'id get by id ',
    required: true,
    type: GetByIdDto,
  })
  @Get(':id')
  getPlaylist(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.playlistService.getPlaylistById(id);
  }

  @ApiTags('playlists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Post('new-playlist')
  newPlaylist(
    @GetAuthenticatedUser() user: User,
    @Body() playlistDto: PlaylistDto,
  ) {
    return this.playlistService.newPlaylist(user, playlistDto);
  }

  @ApiTags('playlists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({
    name: 'id',
    description: 'id get by id ',
    required: true,
    type: GetByIdDto,
  })
  @Put(':id/update-playlist')
  updatePlaylist(
    @Param('id', ParseIntPipe) { id }: GetByIdDto,
    @Body() playlistDto: UpdatePlayListDto,
  ) {
    return this.playlistService.updatePlaylist(id, playlistDto);
  }

  @Delete(':id/delete-playlist')
  deletePlaylist(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.deletePlaylist(id);
  }

  @ApiTags('playlists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({
    name: 'id',
    description: 'id get by id ',
    required: true,
    type: GetByIdDto,
  })
  @Delete(':id/clear-playlist')
  clearPlaylistContent(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.playlistService.clearPlaylistContent(id);
  }

  @ApiTags('playlists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the getUserPlaylists ' })
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
    type: Number,
  })
  @ApiParam({
    name: 'trackId',
    description: 'id get by id ',
    required: true,
    type: Number,
  })
  @Delete(':playlistId/remove-track-from-playlist/:trackId')
  removeTrackFromFavoriteList(
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @Param('trackId', ParseIntPipe) trackId: number,
  ) {
    return this.playlistService.removeTrackFromPlaylist(playlistId, trackId);
  }
}
