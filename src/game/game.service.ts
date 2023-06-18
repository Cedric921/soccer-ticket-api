import { Competition, Game, Reservation, Team } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGameDto, UpdateGameDto } from './game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) { }

  async getGames(): Promise<{
    message: string;
    data: (Game & {
      TeamOne: Team;
      TeamTwo: Team;
    })[];
  }> {
    const data = await this.prisma.game.findMany({
      include: { TeamOne: true, TeamTwo: true },
    });
    return { message: 'games fetched', data };
  }

  async getGame(id: string): Promise<{
    message: string;
    data: Game & {
      TeamOne: Team;
      TeamTwo: Team;
      Competition: Competition;
      Reservation: Reservation[];
    };
  }> {
    const data = await this.prisma.game.findUnique({
      where: { id },
      include: {
        TeamOne: true,
        TeamTwo: true,
        Competition: true,
        Reservation: true,
      },
    });
    return { message: 'game fetched, teams', data };
  }

  async createGame(
    dto: CreateGameDto,
  ): Promise<{ message: string; data: Game }> {
    if (dto.date < new Date()) {
      throw new ForbiddenException('La date ne doit pas etre dans le passé');
    }
    const data = await this.prisma.game.create({ data: dto });
    const game = await this.prisma.game.findUnique({
      where: { id: data.id },
      include: { TeamOne: true, TeamTwo: true },
    });
    return { message: ' game saved ', data: game };
  }

  async updateGame(
    id: string,
    dto: UpdateGameDto,
  ): Promise<{ message: string; data: Game }> {
    if (dto.date < new Date()) {
      throw new ForbiddenException('La date ne doit pas etre dans le passé');
    }

    const data = await this.prisma.game.update({ where: { id }, data: dto });
    return { message: 'updated game', data };
  }
}
