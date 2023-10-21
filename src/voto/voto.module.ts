import { Module } from '@nestjs/common';
import { VotoController } from './voto.controller';
import { DatabaseModule } from 'src/database/database.module';
import { votoProviders } from './providers/voto.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [VotoController],
  providers: [...votoProviders],
})
export class VotoModule {}
