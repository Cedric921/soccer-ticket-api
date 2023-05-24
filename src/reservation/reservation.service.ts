import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return { message: 'reservation fetched' };
  }

  async userReservation(userId: string) {
    return { message: 'my reservation fetched', userId };
  }

  async create(dto: any) {
    return { message: ' reservation created', dto };
  }
}
