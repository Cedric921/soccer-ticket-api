import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCompetitionDTO, UpdateCompetitionDTO } from './competition.dto';
import { Competition, Game } from '@prisma/client';

@Injectable()
export class CompetitionService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompetitions(): Promise<{
    message: string;
    data: Competition[];
  }> {
    const data = await this.prisma.competition.findMany();
    return { message: 'competition list', data };
  }

  async getCompetiton(id: string): Promise<{
    message: string;
    data: Competition & {
      games: Game[];
    };
  }> {
    const data = await this.prisma.competition.findUnique({
      where: { id },
      include: { games: true },
    });
    return { message: 'get competition details, games ', data };
  }

  async createCompetition(dto: CreateCompetitionDTO): Promise<{
    message: string;
    data: Competition;
  }> {
    const data = await this.prisma.competition.create({ data: dto });
    return { message: 'create new competion', data };
  }

  async updateCompetiton(
    id: string,
    dto: UpdateCompetitionDTO,
  ): Promise<{
    message: string;
    data: Competition;
  }> {
    const data = await this.prisma.competition.update({
      where: { id },
      data: dto,
    });
    return { message: 'update exist compet', data };
  }
}
