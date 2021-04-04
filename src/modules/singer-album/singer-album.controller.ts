import { CreateNewSongDto } from './dto/createNewSongDto';
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '../../commons/enums/index.Enum';
import { SingerAlbumService } from './singer-album.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UpdateAlbumDto } from './dto/create-album.dto';

@Controller('singers-albums')
export class SingerAlbumController {
  constructor(private singerAlbumService: SingerAlbumService) {}

  @ApiTags('singers-albums')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the singers-albums ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get()
  getAllSingerAlbums() {
    return this.singerAlbumService.getAllSingerAlbums();
  }

  @ApiTags('singers-albums')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the singers-albums ' })
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
  getSingerAlbum(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.singerAlbumService.getSingerAlbumById(id);
  }

  @ApiTags('singers-albums')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the singers-albums ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({ name: 'id', type: GetByIdDto, description: 'get by id ' })
  @ApiBody({ type: CreateNewSongDto, description: 'the simple api Query' })
  @Post(':id/new-song')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('source'))
  createNewSong(
    @Param('id', ParseIntPipe) id: number,
    @Body('createNewSongDto') createNewSongDto: CreateNewSongDto,
    @UploadedFile() source: any,
  ) {
    return this.singerAlbumService.createNewSong(id, createNewSongDto, source);
  }

  @ApiTags('singers-albums')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the singers-albums ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({ name: 'id', type: GetByIdDto, description: 'get by id ' })
  @ApiBody({ type: UpdateAlbumDto, description: 'the simple api Query' })
  @Put(':id/update-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  updateAlbum(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.singerAlbumService.updateSingerAlbum(id, updateAlbumDto);
  }

  @Delete(':id/delete-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  deleteAlbum(@Param('id', ParseIntPipe) id: number) {
    return this.singerAlbumService.deleteSingerAlbum(id);
  }

  @Delete(':id/clear-singer-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  clearSingerAlbum(@Param('id', ParseIntPipe) id: number) {
    return this.singerAlbumService.clearSingerAlbum(id);
  }
}
