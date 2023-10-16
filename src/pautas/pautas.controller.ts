import { Body, Controller, Res, Post } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import { CreatePautaResource } from './pauta.resource';

@Controller('pautas')
export class PautasController {
  constructor(private readonly pautaService: PautasService) {}

  @Post()
  save(@Body() pauta: CreatePautaResource, @Res() response: Response) {
    return response.send(pauta).status(201);
  }
}
