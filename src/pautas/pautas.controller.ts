import {
  Controller,
  Body,
  Res,
  Post,
  HttpStatus,
  Get,
  Param,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import {
  CriarPautaResource,
  NovaSessaoResource,
  toDomain,
  toRepresentation,
} from './resources/pautas.resource';
import { Pauta } from './entities/pauta.entity';
import { ErrorResponse } from '../common/erro.resource';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagerHelper } from '../common/messages/messages.helper';
import { CreatePautaSwagger } from '../common/swagger/create-pauta.swagger';
import { ListPautaSwagger } from 'src/common/swagger/list-pauta.swagger';

@Controller('pautas')
@ApiTags('Pautas')
export class PautasController {
  private readonly logger = new Logger(PautasController.name);

  constructor(private readonly service: PautasService) {}

  @Post()
  @ApiOperation({ description: 'Criar uma Pauta' })
  @ApiResponse({
    status: 201,
    description: 'Criar uma pauta',
    type: CreatePautaSwagger,
  })
  @ApiResponse({ status: 409, description: 'Pauta já existe' })
  async save(@Body() pauta: CriarPautaResource, @Res() response: Response) {
    this.logger.log(MessagerHelper.MESSAGE_LOGGER_CREATE);

    const pautaDomain: Pauta = toDomain(pauta);
    const result = await this.service.save(pautaDomain);

    if (result.isError()) {
      this.logger.error(
        MessagerHelper.ERROR_CREATE_PAUTA + result.error.message,
      );
      return response
        .status(HttpStatus.CONFLICT)
        .send(new ErrorResponse(result.error.message));
    }

    this.logger.log(MessagerHelper.PAUTA_CREATE + pauta.descricao + '.');
    return response
      .status(HttpStatus.CREATED)
      .send(toRepresentation(result.value));
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as pautas' })
  @ApiResponse({
    status: 200,
    description: 'Retornar uma lista com todas as pautas',
    isArray: true,
    type: ListPautaSwagger,
  })
  async list(@Res() response: Response) {
    const result = await this.service.findAll();
    return response.status(HttpStatus.OK).send(result.map(toRepresentation));
  }

  @Post(':id/sessao')
  @ApiOperation({ summary: 'Inicia uma a votação numa sessão' })
  @ApiResponse({
    status: 200,
    description: 'Inicia uma sessão',
  })
  @ApiResponse({
    status: 404,
    description: 'Pauta não encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Pauta já iniciada',
  })
  async criarSessao(
    @Param('id') id: string,
    @Body() resource: NovaSessaoResource,
    @Res() response: Response,
  ) {
    const pauta: Pauta = await this.service.findById(id);

    if (!pauta) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse(MessagerHelper.PAUTA_NOT_FOUD));
    }

    const sucesso = await this.service.iniciarSessao(pauta, resource.minutos);

    if (sucesso) {
      return response.status(HttpStatus.OK).send();
    }

    const errorResponse = new ErrorResponse(
      MessagerHelper.COULD_NOT_START_A_SESSION,
    );
    return response.status(HttpStatus.CONFLICT).send(errorResponse);
  }
}
