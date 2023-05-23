import { Module } from '@nestjs/common';
import { CompetitionService } from './competition.service';

@Module({
  providers: [CompetitionService],
  exports: [CompetitionService],
})
export class CompetitionModule {}
