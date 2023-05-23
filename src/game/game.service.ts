import { Competition, Game, Reservation, Team } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

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

  async createGame(dto: any): Promise<{ message: string; data: Game }> {
    const data = await this.prisma.game.create({ data: dto });
    return { message: ' game saved ', data };
  }

  async updateGame(
    id: string,
    dto: any,
  ): Promise<{ message: string; data: Game }> {
    const data = await this.prisma.game.update({ where: { id }, data: dto });
    return { message: 'updated game', data };
  }
}
