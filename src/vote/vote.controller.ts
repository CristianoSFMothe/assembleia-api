import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from 'src/pautas/pautas.service';
import { VoteService } from './vote.service';
import { RegistrationVoteResource } from './resourcer/vote.resource';
import { ErrorResponse } from 'src/common/error.resource';
import { MessagerHelper } from 'src/common/meessages/messages.helper';

@Controller('pautas/:id/voto')
export class VoteController {
  constructor(
    private readonly pautasService: PautasService,
    private readonly voteService: VoteService,
  ) {}

  @Post()
  async registerVote(
    @Param('id') idPauta: string,
    @Body() resource: RegistrationVoteResource,
    @Res() response: Response,
  ) {
    const pauta = await this.pautasService.findById(idPauta);

    if (!pauta) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse(MessagerHelper.PAUTA_NOT_FOUD));
    }

    const result = await this.voteService.registerVote(
      pauta,
      resource.cpf,
      resource.voteOption,
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
