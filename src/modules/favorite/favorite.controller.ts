import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../commons/decorators/roles.decorator';
import { Role } from '../../commons/enums/index.Enum';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { ParseIntPipeValidationPipe } from '../../commons/Pipes/parseintpipevalidation.pipe';


@UseGuards(AuthGuard(), UserAuthGuard)
@Roles([Role.USER])
@Controller('favorite-lists')
export class FavoriteController {
  constructor(private favoriteListService: FavoriteService) {
  }

  @Get(':id')
  getUserFavoriteList(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.favoriteListService.getUserFavoriteList(id);
  }

  /*
  the following endpoints related to the interaction between the favorite entity
  and music, song entities
  * */

  @Delete(':id/clear-favorite-list')
  clearFavoriteList(@Param('id', new ParseIntPipeValidationPipe()) id: number) {
    return this.favoriteListService.clearFavoriteListContent(id);
  }

  @Delete(':favoriteId/remove-track-from-favorite-list/:trackId')
  removeTrackFromFavoriteList(@Param('favoriteId', new ParseIntPipeValidationPipe()) favoriteId: number,
    @Param('trackId', new ParseIntPipeValidationPipe()) trackId: number) {
    return this.favoriteListService.removeTrackFromFavouriteList(favoriteId, trackId);
  }
}
