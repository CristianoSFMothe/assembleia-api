import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { VotoService } from '../voto.service';
import { PautasService } from '../../pautas/pautas.service';
import { ErrorResponse } from '../../common/erro.resource';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagerHelper } from '../../common/messages/messages.helper';
import { ReturnResultSwagger } from 'src/common/swagger/return-result.swagger';

@Controller('pautas/:id/resultados')
@ApiTags('Votos')
export class ResultadoController {
  constructor(
    private readonly votoService: VotoService,
    private readonly pautasService: PautasService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retornar o resultado de uma sessão' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o resultado da votação',
    type: ReturnResultSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Pauta não encontrada',
  })
  async obterResultado(
    @Param('id') idPauta: string,
    @Res() response: Response,
  ) {
    const pauta = await this.pautasService.findById(idPauta);

    if (!pauta) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse(MessagerHelper.PAUTA_NOT_FOUD));
    }

    const result = await this.votoService.obterResultado(pauta);

    if (result.isError()) {
      return response
        .status(result.error.status)
        .send(new ErrorResponse(result.error.message));
    }

    return response.status(HttpStatus.OK).send(result.value);
  }
}
