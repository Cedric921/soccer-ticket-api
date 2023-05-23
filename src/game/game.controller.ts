import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getGames() {
    return this.gameService.getGames();
  }

  @Get(':id')
  getGame(@Param('id') id: string) {
    return this.gameService.getGame(id);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Post()
  createGame(@Body() dto: any) {
    return this.gameService.createGame(dto);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Put(':id')
  updateGame(@Param('id') id: string, @Body() dto: any) {
    return this.gameService.updateGame(id, dto);
  }
}
