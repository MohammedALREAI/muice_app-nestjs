import { GetByIdDto } from './../../commons/dto/getByID';
import {
  CreateNewMusician,
  UpdateNewMusician,
} from './dto/createNewMusicianDto';
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
import { Gender, ArtistType } from '../../commons/enums/index.Enum';
import { CreateAlbumDto } from '../../shared/dto/create-album.dto';
import { MusicianService } from './musician.service';
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
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@Controller('musicians')
export class MusicianController {
  constructor(private musicianService: MusicianService) {}

  //localhost:3000/musicians

  @ApiTags('musicians')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get All Musicians ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get()
  getAllMusicians() {
    return this.musicianService.getAllMusicians();
  }

  @ApiTags('musicians')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get All Musicians ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiQuery({ name: 'limit', description: 'limited number', type: Number })
  @ApiQuery({
    name: 'type',
    description: 'limited number',
    enum: ArtistType,
    enumName: 'ArtistType',
  })
  @ApiQuery({
    name: 'nationality',
    description: 'limited number',
    type: String,
  })
  @ApiQuery({
    name: 'gender',
    description: 'gender',
    enum: Gender,
    enumName: 'gender',
  })
  @Get('filtered')
  getFilteredMusicians(
    @Query('limit') limit: number,
    @Query('type') type: ArtistType,
    @Query('nationality') nationality: string,
    @Query('gender') gender: Gender,
  ) {
    return this.musicianService.getFilteredMusicians(
      limit,
      nationality,
      type,
      gender,
    );
  }

  @ApiTags('musicians')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get All Musicians ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiQuery({ name: 'limit', description: 'limited number', type: Number })
  @Get('limited')
  getLimitedMusicians(@Query('limit') limit: number) {
    return this.musicianService.getLimitedMusicians(limit);
  }

  //localhost:3000/musicians
  @ApiTags('musicians')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get All Musicians ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Post()
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  createNewMusician(
    @Body('createNewMusician') createNewMusician: CreateNewMusician,
    @UploadedFile() image: any,
  ) {
    const { name, info, gender, type, nationality } = createNewMusician;
    return this.musicianService.createNewMusician(
      name,
      info,
      gender,
      type,
      nationality,
      image,
    );
  }

  //localhost:3000/musicians/:
  @ApiTags('musicians')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get All Musicians ' })
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
  getMusicianById(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.musicianService.getMusicianById(id);
  }

  @ApiTags('musicians')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get All Musicians ' })
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
  @Post(':id/new-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  createNewAlbum(
    @Param('id', ParseIntPipe) { id }: GetByIdDto,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return this.musicianService.createNewAlbum(id, createAlbumDto);
  }

  @ApiTags('musicians')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get All Musicians ' })
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
  @Put(':id/update-musician')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  updateMusician(
    @Param('id', ParseIntPipe) { id }: GetByIdDto,
    @Body('updateNewMusician') updateNewMusiciane: UpdateNewMusician,
    @UploadedFile() image: any,
  ) {
    const { name, info, gender, type, nationality } = updateNewMusiciane;
    return this.musicianService.updateMusician(
      id,
      name,
      info,
      gender,
      nationality,
      type,
      image,
    );
  }

  @ApiTags('musicians')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'get all the get All Musicians ' })
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
  @Delete(':id/delete-musician')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  deleteMusician(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.musicianService.deleteMusician(id);
  }
}
