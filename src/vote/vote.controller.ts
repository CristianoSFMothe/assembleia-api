import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from 'src/pautas/pautas.service';
import { VoteService } from './vote.service';
import { RegistrationVoteResource } from './resourcer/vote.resource';

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
    return response.status(HttpStatus.ACCEPTED).send();
  }
}
