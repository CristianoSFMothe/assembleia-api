import { ApiProperty } from '@nestjs/swagger';
import { OpcaoVoto } from '../entities/voto.entity';

export class ResultadoVotacaoResource {
  @ApiProperty()
  pauta: string;

  @ApiProperty()
  abertura: Date;

  @ApiProperty()
  encerramento: Date;

  @ApiProperty()
  totalVotos: number;

  @ApiProperty()
  quantidadeSim: number;

  @ApiProperty()
  quantidadeNao: number;

  @ApiProperty()
  opcaoGanhadora: OpcaoVoto;
}
