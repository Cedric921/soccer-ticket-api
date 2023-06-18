import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Game, Team } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) { }

  async getTeams(): Promise<{
    message: string;
    data: Team[];
  }> {
    try {
      const data = await this.prisma.team.findMany();
      return { message: 'teams fetched', data };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getTeam(id: string): Promise<{
    message: string;
    data: Team & {
      gamesOne: Game[];
      gamesTwo: Game[];
    };
  }> {
    try {
      const data = await this.prisma.team.findUnique({
        where: { id },
        include: { gamesOne: true, gamesTwo: true },
      });
      return { message: 'team fetched', data };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async createTeam(dto: any): Promise<{
    message: string;
    data: Team;
  }> {
    const data = await this.prisma.team.create({ data: dto });
    return { message: 'team created', data };
  }

  async updateTeam(
    id: string,
    dto: any,
  ): Promise<{
    message: string;
    data: Team;
  }> {
    try {
      const data = await this.prisma.team.update({ where: { id }, data: dto });
      return { message: 'team updated', data };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
