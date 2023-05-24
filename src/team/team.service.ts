import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async getTeams() {
    return { message: 'teams fetched' };
  }

  async getTeam(id: string) {
    return { message: 'team fetched', id };
  }

  async createTeam(dto: any) {
    return { message: 'team created', data: dto };
  }

  async updateTeam(id: string, dto: any) {
    return { message: 'team updated', id, dto };
  }
}
