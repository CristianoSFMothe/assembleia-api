import { Inject, Injectable } from '@nestjs/common';
import { Pauta } from './pauta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PautasService {
  constructor(
    @Inject('PAUTA_REPOSITORY')
    private readonly pautaRepository: Repository<Pauta>,
  ) {}

  public async save(pauta: Pauta): Promise<Pauta> {
    const description = pauta.description;

    const pautaExists = await this.pautaRepository.findOne({
      where: {
        description: description,
      },
    });

    if (pautaExists) {
      throw Error('Pauta existente');
    }

    pauta = await this.pautaRepository.save(pauta);

    return pauta;
  }
}
