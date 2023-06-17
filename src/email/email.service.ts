import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Reservation, User } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async sendUserTicket(user: User, ticket: Reservation) {
    await this.mailService.sendMail({
      to: user.email,
      subject: 'Votre billet de Match',
      template: './ticket',
      context: {
        names: user.names,
        code_ticket: ticket.uniqueCode,
        date: ticket.date,
        place: ticket.place,
      },
    });
  }
}
