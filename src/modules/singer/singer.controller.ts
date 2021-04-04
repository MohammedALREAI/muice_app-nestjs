import { GetByIdDto } from './../../commons/dto/getByID';
import {
  CreateNewSingerDto,
  UpdateNewSingerDto,
} from './dto/createNewSingerDto';
import { GetQuerySingers } from './dto/getFilteredSingersDto';
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
import { SingerService } from './singer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { Role } from '../../commons/enums/index.Enum';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@Controller('singers')
export class SingerController {
  constructor(private singerService: SingerService) {}

  @ApiTags('singers')
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
  @Get()
  getAllSingers() {
    return this.singerService.getAllSingers();
  }

  @ApiTags('singers')
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
  @ApiQuery({
    name: 'getQuerySingers',
    type: GetQuerySingers,
    description: 'the simple api Query',
  })
  @Get('filtered')
  getFilteredSingers(
    @Query('GetQuerySingers') getQuerySingers: GetQuerySingers,
  ) {
    return this.singerService.getFilteredSingers(getQuerySingers);
  }

  @ApiTags('singers')
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
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'the simple api Query',
  })
  @Get('limited')
  getLimitedSingers(@Query('limit') limit: number) {
    return this.singerService.getLimitedSingers(limit);
  }

  //localhost:3000/singers

  @ApiTags('singers')
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
  @ApiBody({ type: CreateNewSingerDto, description: 'the simple api Query' })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  createNewSinger(
    @Body('createNewSinger') createNewSinger: CreateNewSingerDto,
    @UploadedFile() image: any,
  ) {
    return this.singerService.createNewSinger(createNewSinger, image);
  }

  //localhost:3000/singers/:id
  @ApiTags('singers')
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
  @ApiParam({ name: 'id', type: GetByIdDto, description: 'get by id ' })
  @Get(':id')
  getSingerById(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.singerService.getSingerById(id);
  }

  @ApiTags('singers')
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
  @ApiParam({ name: 'id', type: GetByIdDto, description: 'get by id ' })
  @ApiBody({ type: CreateNewSingerDto, description: 'the simple api Query' })
  @Post(':id/new-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  createNewAlbum(
    @Param('id', ParseIntPipe) { id }: GetByIdDto,
    @Body('updateNewSingerDto') createNewSingerDto: CreateNewSingerDto,
  ) {
    return this.singerService.createNewAlbum(id, createNewSingerDto);
  }

  @ApiTags('singers')
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
  @ApiParam({ name: 'id', type: GetByIdDto, description: 'get by id ' })
  @ApiBody({ type: UpdateNewSingerDto, description: 'the simple api Query' })
  @Put(':id/update-singer')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  updateSinger(
    @Param('id', ParseIntPipe) id: number,
    @Body('updateNewSingerDt') updateNewSingerDt: UpdateNewSingerDto,
    @UploadedFile() image: any,
  ) {
    return this.singerService.updateSinger(id, updateNewSingerDt, image);
  }

  @ApiTags('singers')
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
  @ApiParam({ name: 'id', type: GetByIdDto, description: 'get by id ' })
  @Delete(':id/delete-singer')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  deleteSinger(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.singerService.deleteSinger(id);
  }
}
