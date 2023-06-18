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
  ) { }

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
    data: Reservation;
  }> {

    const data = await this.prisma.reservation.create({
      data: { ...dto, userId: user.id, date: new Date() },
    });

    await this.emailService.sendUserTicket(user, data);
    return { message: ' reservation created', data };
  }
}
