import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<{
    message: string;
    data: Reservation[];
  }> {
    const data = await this.prisma.reservation.findMany({
      include: {
        Game: { include: { TeamOne: true, TeamTwo: true, Competition: true } },
      },
    });
    return { message: 'reservation fetched', data };
  }

  async userReservation(userId: string): Promise<{
    message: string;
    data: Reservation[];
  }> {
    const data = await this.prisma.reservation.findMany({
      where: { userId },
      include: {
        Game: { include: { TeamOne: true, TeamTwo: true, Competition: true } },
      },
    });
    return { message: 'my reservation fetched', data };
  }

  async create(dto: any): Promise<{
    message: string;
    data: Reservation;
  }> {
    const data = await this.prisma.reservation.create({ data: dto });
    return { message: ' reservation created', data };
  }
}
