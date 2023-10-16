import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PautasModule } from './pautas/pautas.module';

@Module({
  imports: [DatabaseModule, PautasModule],
})
export class AppModule {}
