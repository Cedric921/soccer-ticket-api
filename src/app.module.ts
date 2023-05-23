import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TeamModule } from './team/team.module';
import { GameModule } from './game/game.module';
import { CompetitionModule } from './competition/competition.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TeamModule,
    GameModule,
    CompetitionModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
