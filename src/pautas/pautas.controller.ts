import {
  Body,
  Controller,
  Res,
  Post,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import {
  CreatePautaResource,
  NewSessionResource,
  toDomain,
  toRepresentation,
} from './resource/pauta.resource';
import { Pauta } from './entities/pauta.entity';
import { ErrorResponse } from '../common/error.resource';
import { MessagerHelper } from '../common/meessages/messages.helper';

@Controller('pautas')
export class PautasController {
  constructor(private readonly pautaService: PautasService) {}

  @Post()
  public async save(
    @Body() pauta: CreatePautaResource,
    @Res() response: Response,
  ) {
    const pautaDomain: Pauta = toDomain(pauta);
    const result = await this.pautaService.save(pautaDomain);

    if (result.isError()) {
      return response
        .status(HttpStatus.CONFLICT)
        .send(new ErrorResponse(result.error.message));
    }

    return response
      .status(HttpStatus.CREATED)
      .send(toRepresentation(result.value));
  }

  @Get()
  public async list(@Res() response: Response) {
    const result = await this.pautaService.findAll();

    return response.status(HttpStatus.OK).send(result.map(toRepresentation));
  }

  @Post(':id/session')
  public async createSessio(
    @Param('id') id: string,
    @Body() resource: NewSessionResource,
    @Res() response: Response,
  ) {
    const pauta: Pauta = await this.pautaService.findById(id);

    if (!pauta) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse(MessagerHelper.PAUTA_NOT_FOUD));
    }

    const success = await this.pautaService.startSession(
      pauta,
      resource.minutes,
    );

    if (success) {
      return response.status(HttpStatus.OK).send();
    }

    return response
      .status(HttpStatus.CONFLICT)
      .send(new ErrorResponse(MessagerHelper.COULD_NOT_START_A_SESSION));
  }
}
