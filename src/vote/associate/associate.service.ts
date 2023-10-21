import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Associate } from './associate.entity';

@Injectable()
export class AssociateService {
  constructor(
    @Inject('ASSOCIADO_REPOSITORY')
    private readonly associadoRepository: Repository<Associate>,
  ) {}
}
