import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { DatabaseModule } from 'src/database/database.module';
import { voteProviders } from './providers/vote.providers';
import { VoteService } from './vote.service';
import { AssociateService } from './associate/associate.service';
import { PautasModule } from 'src/pautas/pautas.module';

@Module({
  controllers: [VoteController],
  imports: [DatabaseModule, PautasModule],
  providers: [...voteProviders, VoteService, AssociateService],
})
export class VoteModule {}
