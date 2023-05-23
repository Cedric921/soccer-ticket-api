import { Module } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CompetitonController } from './competiton.controller';

@Module({
  controllers: [CompetitonController],
  providers: [CompetitionService],
  exports: [CompetitionService],
})
export class CompetitionModule {}
