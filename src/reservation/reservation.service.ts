import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Reservation, User } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import { CreateReservationDTO } from './reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    private readonly prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async getAll(): Promise<{
    message: string;
    data: Reservation[];
  }> {
    const data = await this.prisma.reservation.findMany({
      include: {
        Game: { include: { TeamOne: true, TeamTwo: true, Competition: true } },
        User: true,
      },
    });
    return { message: 'reservation fetched', data };
  }

  async getOne(id: string): Promise<{
    message: string;
    data: Reservation;
  }> {
    const data = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        Game: { include: { TeamOne: true, TeamTwo: true, Competition: true } },
        User: true,
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
        User: true,
      },
    });
    return { message: 'my reservation fetched', data };
  }

  async create(
    dto: CreateReservationDTO,
    user: User,
  ): Promise<{
    message: string;
    data: Reservation | null;
  }> {
    const reserved = await this.prisma.reservation.findMany({
      where: { gameId: dto.gameId },
    });

    const game = await this.prisma.game.findUnique({
      where: { id: dto.gameId },
    });

    if (game.places <= reserved.length) {
      return { message: 'reservation failed', data: null };
    }

    const uniqueCode = new Date().getTime();

    const data = await this.prisma.reservation.create({
      data: {
        ...dto,
        userId: user.id,
        date: new Date(),
        place: reserved.length + 1,
        uniqueCode: uniqueCode.toString(),
      },
    });

    await this.emailService.sendUserTicket(user, data);
    return { message: ' reservation created', data };
  }
}
