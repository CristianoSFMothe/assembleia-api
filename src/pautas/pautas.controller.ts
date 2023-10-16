import { Body, Controller, Res, Post } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import { CreatePautaResource, toDomain } from './pauta.resource';
import { Pauta } from './pauta.entity';

@Controller('pautas')
export class PautasController {
  constructor(private readonly pautaService: PautasService) {}

  @Post()
  public async save(
    @Body() pauta: CreatePautaResource,
    @Res() response: Response,
  ) {
    const pautaDomain: Pauta = toDomain(pauta);
    const savePauta = await this.pautaService.save(pautaDomain);

    return response.send(savePauta).status(201);
  }
}
