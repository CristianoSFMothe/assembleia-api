import { Module } from '@nestjs/common';
import { VotoController } from './voto.controller';
import { DatabaseModule } from '../database/database.module';
import { PautasModule } from '../pautas/pautas.module';
import { votoProviders } from './providers/voto.providers';
import { VotoService } from './voto.service';
import { AssociadoService } from './associado/associado.service';
import { ResultadoController } from './resultado/resultado.controller';

@Module({
  controllers: [VotoController, ResultadoController],
  imports: [DatabaseModule, PautasModule],
  providers: [...votoProviders, VotoService, AssociadoService],
})
export class VotoModule {}
