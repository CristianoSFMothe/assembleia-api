/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pauta } from './entities/pauta.entity';
import { Result } from '../common/result';
import { MessagerHelper } from '../common/messages/messages.helper';

@Injectable()
export class PautasService {
  static TEMPO_PADRAO_PAUTA: number = 10;

  constructor(
    @Inject('PAUTA_REPOSITORY')
    private readonly pautaRepository: Repository<Pauta>,
  ) {}

  async save(pauta: Pauta): Promise<Result<Pauta, Error>> {
    const descricao = pauta.descricao;

    const possivelPauta = await this.pautaRepository.findOne({
      where: {
        descricao: descricao,
      },
    });

    if (possivelPauta) {
      return new Result(null, new Error(MessagerHelper.PAUTA_EXISTING));
    }

    pauta = await this.pautaRepository.save(pauta);

    return new Result(pauta, null);
  }

  async findAll(): Promise<Pauta[]> {
    return await this.pautaRepository.find();
  }

  async iniciarSessao(
    pauta: Pauta,
    minutos: number = PautasService.TEMPO_PADRAO_PAUTA,
  ): Promise<boolean> {
    if (!pauta.isPossivelIniciarSessao()) {
      return false;
    }

    pauta.abertura = new Date();
    pauta.fechamento = new Date(pauta.abertura.getTime() + minutos * 60000);

    await this.pautaRepository.update(pauta.id, pauta);

    return true;
  }

  async findById(id: string): Promise<Pauta> {
    return await this.pautaRepository.findOneBy({
      id: id,
    });
  }
}
