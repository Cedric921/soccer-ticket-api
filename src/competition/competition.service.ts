import { Injectable } from '@nestjs/common';

@Injectable()
export class CompetitionService {
  async getCompetitions() {
    return { message: 'competition list' };
  }

  async getCompetiton(id: string) {
    return { message: 'get competition details, games ', id };
  }

  async createCompetition(dto: any) {
    return { message: 'create new competion', dto };
  }

  async updateCompetiton(id: string, dto: any) {
    return { message: 'update exist compet', id, dto };
  }
}
