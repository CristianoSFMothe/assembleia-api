import { Body, Controller, Res, Post } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import { CreatePautaResource, toDomain } from './resource/pauta.resource';
import { Pauta } from './entities/pauta.entity';

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
      return response.status(409).send({
        message: result.error.message,
      });
    }

    return response.status(201).send(result.value);
  }
}
