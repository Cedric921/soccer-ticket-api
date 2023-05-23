import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateCompetitionDTO, UpdateCompetitionDTO } from './competition.dto';

@Controller('compets')
export class CompetitonController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get()
  getCompetitions() {
    return this.competitionService.getCompetitions();
  }

  @Get(':id')
  getCompetiton(@Param('id') id: string) {
    return this.competitionService.getCompetiton(id);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Post()
  createCompetition(@Body() dto: CreateCompetitionDTO) {
    return this.competitionService.createCompetition(dto);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Put(':id')
  updateCompetiton(@Param('id') id: string, @Body() dto: UpdateCompetitionDTO) {
    return this.competitionService.updateCompetiton(id, dto);
  }
}
