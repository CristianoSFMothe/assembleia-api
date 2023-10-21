import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PautasModule } from './pautas/pautas.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [DatabaseModule, PautasModule, VoteModule],
})
export class AppModule {}
