import { Inject, Injectable } from '@nestjs/common';
import { Pauta } from './entities/pauta.entity';
import { Repository } from 'typeorm';
import { Result } from '../common/results';

@Injectable()
export class PautasService {
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
}
