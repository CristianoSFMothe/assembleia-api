/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Pauta } from '../entities/pauta.entity';
import { Provider } from '@nestjs/common';

const PautaRepository: Provider<Repository<Pauta>> = {
  provide: 'PAUTA_REPOSITORY',
  useFactory: (dataSource: DataSource) => {
    const repository: Repository<Pauta> = dataSource.getRepository(Pauta);

    return repository;
  },

  inject: ['DATA_SOURCE'],
};

export const pautaProviders: Provider[] = [PautaRepository];