import { Competition, Game, Reservation, Team, User } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGameDto, UpdateGameDto } from './game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async getGames(): Promise<{
    message: string;
    data: (Game & {
      TeamOne: Team;
      TeamTwo: Team;
      Reservation: (Reservation & { User: User })[];
    })[];
  }> {
    try {
      const data = await this.prisma.game.findMany({
        include: {
          TeamOne: true,
          TeamTwo: true,
          Reservation: { include: { User: true } },
        },
      });
      return { message: 'games fetched', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getGame(id: string): Promise<{
    message: string;
    data: Game & {
      TeamOne: Team;
      TeamTwo: Team;
      Competition: Competition;
      Reservation: (Reservation & { User: User })[];
    };
  }> {
    try {
      const data = await this.prisma.game.findUnique({
        where: { id },
        include: {
          TeamOne: true,
          TeamTwo: true,
          Competition: true,
          Reservation: {
            include: {
              User: true,
            },
          },
        },
      });
      return { message: 'game fetched, teams', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createGame(
    dto: CreateGameDto,
  ): Promise<{ message: string; data: Game }> {
    const now = new Date().getTime();
    try {
      if (new Date(dto.date).getTime() < now) {
        throw new ForbiddenException('La date ne doit pas etre dans le passé');
      }
      if (dto.places < 200) {
        throw new ForbiddenException(
          'le nombre des places doit etre superieur a 200',
        );
      }
      const data = await this.prisma.game.create({ data: dto });
      const game = await this.prisma.game.findUnique({
        where: { id: data.id },
        include: { TeamOne: true, TeamTwo: true },
      });
      return { message: ' game saved ', data: game };
    } catch (error) {
      console.log(
        { error, now, dat: new Date(dto.date).getTime() },
        new Date(dto.date).getTime() < now,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async updateGame(
    id: string,
    dto: UpdateGameDto,
  ): Promise<{ message: string; data: Game }> {
    try {
      if (dto.date < new Date()) {
        throw new ForbiddenException('La date ne doit pas etre dans le passé');
      }

      const data = await this.prisma.game.update({ where: { id }, data: dto });
      return { message: 'updated game', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
