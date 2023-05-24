import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { User } from '@prisma/client';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Get()
  getAll() {
    return this.reservationService.getAll();
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN', 'USER']))
  @Get('user')
  getUserReservation(@GetUser() user: User) {
    return this.reservationService.userReservation(user.id);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN', 'USER']))
  @Post()
  createReservation(@Body() dto: any) {
    return this.reservationService.create(dto);
  }
}
