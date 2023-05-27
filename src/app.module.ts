import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TeamModule } from './team/team.module';
import { GameModule } from './game/game.module';
import { CompetitionModule } from './competition/competition.module';
import { ReservationModule } from './reservation/reservation.module';
import { AppLoggerMiddleware } from './middleware/logger';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TeamModule,
    PrismaModule,
    GameModule,
    CompetitionModule,
    ReservationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
