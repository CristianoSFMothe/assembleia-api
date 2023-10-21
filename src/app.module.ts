import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PautasModule } from './pautas/pautas.module';
import { VotoModule } from './voto/voto.module';

@Module({
  imports: [DatabaseModule, PautasModule, VotoModule],
})
export class AppModule {}
