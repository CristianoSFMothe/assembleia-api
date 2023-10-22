import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from '../pautas/pautas.service';
import { VotoService } from './voto.service';
import { RegistroVotoResource } from './resources/voto.resource';
import { ErrorResponse } from '../common/erro.resource';
import { ApiTags } from '@nestjs/swagger';
import { MessagerHelper } from '../common/messages/messages.helper';

@Controller('pautas/:id/votos')
@ApiTags('Votos')
export class VotoController {
  constructor(
    private readonly pautasService: PautasService,
    private readonly votoService: VotoService,
  ) {}

  @Post('')
  async registrarVoto(
    @Param('id') idPauta: string,
    @Body() resource: RegistroVotoResource,
    @Res() response: Response,
  ) {
    const pauta = await this.pautasService.findById(idPauta);

    if (!pauta) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse(MessagerHelper.PAUTA_NOT_FOUD));
    }

    const result = await this.votoService.registrarVoto(
      pauta,
      resource.cpf,
      resource.opcaoVoto,
    );

    if (result.isError()) {
      const error = result.error;
      return response
        .status(error.status)
        .send(new ErrorResponse(error.message));
    }

    return response.status(HttpStatus.ACCEPTED).send();
  }
}
