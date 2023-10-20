/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Inject, Injectable } from '@nestjs/common';
import { Pauta } from './entities/pauta.entity';
import { Repository } from 'typeorm';
import { Result } from '../common/results';

@Injectable()
export class PautasService {
  static STANDARD_TIME_PAUTA: number = 10;

  constructor(
    @Inject('PAUTA_REPOSITORY')
    private readonly pautaRepository: Repository<Pauta>,
  ) {}

  public async save(pauta: Pauta): Promise<Result<Pauta>> {
    const description = pauta.description;

    const pautaExists = await this.pautaRepository.findOne({
      where: {
        description: description,
      },
    });

    if (pautaExists) {
      return new Result(null, new Error('Pauta existente'));
    }

    pauta = await this.pautaRepository.save(pauta);

    return new Result(pauta, null);
  }

  public async findAll(): Promise<Pauta[]> {
    return await this.pautaRepository.find();
  }

  public async startSession(
    pauta: Pauta,
    minutes: number = PautasService.STANDARD_TIME_PAUTA,
  ): Promise<boolean> {
    if (!pauta.isPossibleToStartSession()) {
      return false;
    }

    pauta.open = new Date();

    pauta.close = new Date(pauta.open.getTime() + minutes * 6000);

    await this.pautaRepository.update(pauta.id, pauta);

    return true;
  }
}
