import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vote, voteOption } from './entities/vote.entity';
import { AssociateService } from './associate/associate.service';
import { Pauta } from '../pautas/entities/pauta.entity';
import { Result } from '../common/results';
import { Associate } from './associate/associate.entity';
import { MessagerHelper } from '../common/meessages/messages.helper';
import { HttpError } from '../common/httpError';

@Injectable()
export class VoteService {
  constructor(
    @Inject('VOTO_REPOSITORY')
    private readonly voteRepository: Repository<Vote>,
    private readonly associateService: AssociateService,
  ) {}

  public async registerVote(
    pauta: Pauta,
    cpf: string,
    voteOption: voteOption,
  ): Promise<Result<Vote, HttpError>> {
    if (!pauta.isWasStarted()) {
      return new Result(
        null,
        new HttpError(
          MessagerHelper.PAUTA_NOT_SESSION,
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      );
    }

    const associate = await this.associateService.recoverOrRegister(cpf);

    const voteHasAlreadyBeenRegistered: boolean = await this.thereIIsAVoteFor(
      pauta,
      associate,
    );

    if (voteHasAlreadyBeenRegistered) {
      return new Result(
        null,
        new HttpError(MessagerHelper.VOTE_EXISTING, HttpStatus.CONFLICT),
      );
    }

    const vote = new Vote();
    vote.associate = associate;
    vote.pauta = pauta;
    vote.voteOption = voteOption;

    await this.voteRepository.save(vote);

    return new Result(vote, null);
  }

  public async thereIIsAVoteFor(
    pauta: Pauta,
    associate: Associate,
  ): Promise<boolean> {
    const vote: Vote = await this.voteRepository.findOne({
      where: {
        pauta: {
          id: pauta.id,
        },
        associate: {
          id: associate.id,
        },
      },
    });

    return !!vote;
  }
}