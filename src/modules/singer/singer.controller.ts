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
import { ArtistType, Gender, Role } from '../../commons/enums/index.Enum';
import { CreateAlbumDto } from '../singer-album/dto/create-album.dto';
import { SingerService } from './singer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { CreateNewSingerDto } from './dto/createNewSingerDto';
import { UpdateSingerDto } from './dto/UpdateSingerDto';
import { GetFilteredSingers } from './dto/getFilteredSingersDto';
import { editFile } from '../../commons/helpers/handling-files.helper';
import { diskStorage } from 'multer';
import { ParseIntPipeValidationPipe } from '../../commons/Pipes/parseintpipevalidation.pipe';
@Controller('singers')
export class SingerController {

  constructor(private readonly singerService: SingerService) {
  }

  //localhost:3000/singers
  @Get()
  getAllSingers() {
    return this.singerService.getAllSingers();
  }

  @Get('filtered')
  getFilteredSingers(@Query() getFilteredSingers: GetFilteredSingers) {

    return this.singerService.getFilteredSingers(getFilteredSingers);
  }

  @Get('limited')
  getLimitedSingers(@Query('limit') limit: number) {
    return this.singerService.getLimitedSingers(limit);
  }



  //localhost:3000/singers
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './file/singers',
        filename: editFile,
      }),
    }))
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  createNewSinger(@Body() createNewSingerDto: CreateNewSingerDto,
    @UploadedFile() image: any) {
    return this.singerService.createNewSinger(createNewSingerDto, image.path);
  }

  //localhost:3000/singers/:id
  @Get(':id')
  getSingerById(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.singerService.getSingerById(id);
  }

  @Post(':id/new-album')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  createNewAlbum(@Param('id', new ParseIntPipeValidationPipe()) id: number,
    @Body() createAlbumDto: CreateAlbumDto) {

    return this.singerService.createNewAlbum(id, createAlbumDto);
  }

  @Put(':id/update-singer')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  updateSinger(@Param('id', new ParseIntPipeValidationPipe()) id: number,
    @Body('name') name: string,
    @Body('info') info: string,
    @Body('gender') gender: Gender,
    @Body('nationality') nationality: string,
    @Body('type') type: ArtistType,
    @UploadedFile() image: any) {
    const updateSingerDto: UpdateSingerDto = {
      id, name, info, gender, nationality, type, image
    }
    return this.singerService.updateSinger(updateSingerDto);
  }

  @Delete(':id/delete-singer')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  deleteSinger(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.singerService.deleteSinger(id);
  }

}
