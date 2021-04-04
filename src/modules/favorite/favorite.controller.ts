import { GetByIdDto } from './../../commons/dto/getByID';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../commons/decorators/roles.decorator';
import { Role } from '../../commons/enums/index.Enum';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@UseGuards(AuthGuard(), UserAuthGuard)
@Roles([Role.USER])
@Controller('favorite-lists')
export class FavoriteController {
  constructor(private favoriteListService: FavoriteService) {}

  /**
   * @Get(':id')
   * @param param =>id
   * @returns
   */
  @ApiTags('favorite-lists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'favorite-lists for user   by id ' })
  @ApiParam({ name: 'id', description: 'id' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request with get FavoriteList ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get(':id')
  getUserFavoriteList(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.favoriteListService.getUserFavoriteList(id);
  }

  /*
  the following endpoints related to the interaction between the favorite entity
  and music, song entities
  * */

  @ApiTags('favorite-lists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'favorite-lists for user   by clearFavoriteList ',
  })
  @ApiParam({ name: 'id', description: 'id', type: GetByIdDto })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Delete(':id/clear-favorite-list')
  clearFavoriteList(@Param('id', ParseIntPipe) { id }: GetByIdDto) {
    return this.favoriteListService.clearFavoriteListContent(id);
  }

  /**
   *  Delete =>
   * @param favoriteId
   * @param trackId
   * @returns
   */
  @ApiTags('favorite-lists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'favorite-lists for user   by clearFavoriteList ',
  })
  @ApiParam({ name: 'favoriteId', description: ' id ' })
  @ApiParam({ name: 'trackId', description: 'trackId id ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({
    description: 'bad Request with get clearFavoriteList FavoriteList ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Delete(':favoriteId/remove-track-from-favorite-list/:trackId')
  removeTrackFromFavoriteList(
    @Param('favoriteId', ParseIntPipe) favoriteId: number,
    @Param('trackId', ParseIntPipe) trackId: number,
  ) {
    return this.favoriteListService.removeTrackFromFavouriteList(
      favoriteId,
      trackId,
    );
  }
}
