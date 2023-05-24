import { RolesGuard } from 'src/auth/guard/roles.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  getTeams() {
    return this.teamService.getTeams();
  }

  @Get(':id')
  getTeam(@Param('id') id: string) {
    return this.teamService.getTeam(id);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Post()
  createTeam(@Body() dto: any) {
    return this.teamService.createTeam(dto);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Put(':id')
  updateTeam(@Param('id') id: string, @Body() dto: any) {
    return this.teamService.updateTeam(id, dto);
  }
}
