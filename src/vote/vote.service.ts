import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VoteService {
  constructor(
    @Inject('VOTO_REPOSITORY')
    private readonly votoRepository: Repository<Vote>,
  ) {}
}
