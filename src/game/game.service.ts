import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  async getGames() {
    return { message: 'games fetched' };
  }

  async getGame(id: string) {
    return { message: 'game fetched, teams', id };
  }

  async createGame(dto: any) {
    return { message: ' game saved ', dto };
  }

  async updateGame(id: string, dto: any) {
    return { message: 'updated game', dto, id };
  }
}
