import { GetByIdDto } from './../../commons/dto/getByID';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateMusicAlBoomsDto,
  UpdateMusicAlBoomsDto,
} from './dto/createNewMusicDto';
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MusicianAlbumService } from './musician-album.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { Role } from '../../commons/enums/index.Enum';

@Controller('musicians-albums')
@ApiBearerAuth("JWT")
  @ApiTags('musicians-albums')


export class MusicianAlbumController {
  constructor(private musicianAlbumService: MusicianAlbumService) {}

  /**
   *  Get getAllMusicianAlbums
   * @returns
   */


  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get musicians-albums ' })
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
    type: Number,
  })
  @Get()
  getAllMusicianAlbums() {
    return this.musicianAlbumService.getAllMusicianAlbums();
  }


  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get musicians-albums ' })
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
    type: Number,
  })
  @Get(':id')
  getMusicianAlbum(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.musicianAlbumService.getMusicianAlbumById(id);
  }


  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get musicians-albums ' })
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
    type: Number,
  })
  @Post(':id/new-music')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('source'))
  createNewMusic(
    @Param('id', ParseIntPipe) { id }: GetByIdDto,
    @Body('createMusicAlBoomsDto') createMusicAlBoomsDto: CreateMusicAlBoomsDto,
    @UploadedFile() source: any,
  ) {
    const { name, description, artist, type } = createMusicAlBoomsDto;
    return this.musicianAlbumService.createNewMusic({
    musicianAlbumId:id,
      name,
      description,
      artist,
      type,
    },
      source);
  }


  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get musicians-albums ' })
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
    type: Number,
  })
  @Post(':id/new-music')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('source'))
  updateAlbum(
    @Param('id', ParseIntPipe) { id }: GetByIdDto,
    @UploadedFile() source: any,
    @Body('updateMusicAlBoomsDto') updateMusicAlBoomsDto: UpdateMusicAlBoomsDto,
  ) {
    const { name, description, artist, type } = updateMusicAlBoomsDto;

    return this.musicianAlbumService.updateMusicianAlbum({name,description,artist,type,musicianAlbumId:id},source);
  }


  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get musicians-albums ' })
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
    type: Number,
  })
  @Delete(':id/delete-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  deleteAlbum(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.musicianAlbumService.deleteMusicianAlbum(id);
  }
}
