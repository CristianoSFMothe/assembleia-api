import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Associate } from './associate.entity';

@Injectable()
export class AssociateService {
  constructor(
    @Inject('ASSOCIADO_REPOSITORY')
    private readonly associadoRepository: Repository<Associate>,
  ) {}

  public async getByCpf(cpf: string): Promise<Associate> {
    return await this.associadoRepository.findOne({
      where: {
        cpf,
      },
    });
  }

  public async recoverOrRegister(cpf: string): Promise<Associate> {
    const associateFound: Associate = await this.getByCpf(cpf);

    if (associateFound) {
      return associateFound;
    }

    const newAssociate = new Associate();
    newAssociate.cpf = cpf;
    await this.associadoRepository.save(newAssociate);

    return newAssociate;
  }
}
