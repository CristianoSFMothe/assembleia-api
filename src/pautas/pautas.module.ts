import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PautasService } from './pautas.service';
import { PautasController } from './pautas.controller';
import { pautaProviders } from './providers/pauta.providers';

@Module({
  imports: [DatabaseModule],
  providers: [PautasService, ...pautaProviders],
  controllers: [PautasController],
  exports: [PautasService],
})
export class PautasModule {}
