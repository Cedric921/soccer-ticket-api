import { PrismaService } from './../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCompetitionDTO, UpdateCompetitionDTO } from './competition.dto';
import { Competition, Game } from '@prisma/client';

@Injectable()
export class CompetitionService {
  constructor(private readonly prisma: PrismaService) { }

  async getCompetitions(): Promise<{
    message: string;
    data: Competition[];
  }> {
    try {
      const data = await this.prisma.competition.findMany();
      return { message: 'competition list', data };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getCompetiton(id: string): Promise<{
    message: string;
    data: Competition & {
      games: Game[];
    };
  }> {
    try {
      const data = await this.prisma.competition.findUnique({
        where: { id },
        include: { games: { include: { TeamOne: true, TeamTwo: true } } },
      });
      return { message: 'get competition details, games ', data };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async createCompetition(dto: CreateCompetitionDTO): Promise<{
    message: string;
    data: Competition;
  }> {
    try {
      const data = await this.prisma.competition.create({ data: dto });
      return { message: 'create new competion', data };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateCompetiton(
    id: string,
    dto: UpdateCompetitionDTO,
  ): Promise<{
    message: string;
    data: Competition;
  }> {
    try {
      const data = await this.prisma.competition.update({
        where: { id },
        data: dto,
      });
      return { message: 'update exist compet', data };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
