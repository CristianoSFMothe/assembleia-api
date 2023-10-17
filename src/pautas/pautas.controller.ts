import { Body, Controller, Res, Post, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import {
  CreatePautaResource,
  toDomain,
  toRepresentation,
} from './resource/pauta.resource';
import { Pauta } from './entities/pauta.entity';
import { ErrorResponse } from '../common/error.resource';

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
}
