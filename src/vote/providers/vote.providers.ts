/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Vote } from '../entities/vote.entity';
import { Associate } from '../associate/associate.entity';

const VoteRepository: Provider<Repository<Vote>> = {
  provide: 'VOTO_REPOSITORY',
  useFactory: (dataSource: DataSource) => {
    return dataSource.getRepository(Vote);
  },
  inject: ['DATA_SOURCE'],
};

const AssociateRepository: Provider<Repository<Associate>> = {
  provide: 'ASSOCIADO_REPOSITORY',
  useFactory: (dataSource: DataSource) => {
    return dataSource.getRepository(Associate);
  },
  inject: ['DATA_SOURCE'],
};

export const voteProviders: Provider[] = [VoteRepository, AssociateRepository];
