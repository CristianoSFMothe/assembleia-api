import { OpcaoVoto } from '../entities/voto.entity';
import { IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MessagerHelper } from 'src/common/messages/messages.helper';

export class RegistroVotoResource {
  @ApiProperty()
  @IsNotEmpty({ message: MessagerHelper.CPF_REQUIRED })
  cpf: string;

  @IsNotEmpty({ message: MessagerHelper.VOTE_OPTIONS_REQUIRED })
  @IsIn([OpcaoVoto.NAO, OpcaoVoto.SIM], {
    message: MessagerHelper.VOTE_OPTIONS,
  })
  @ApiProperty({ example: MessagerHelper.VOTE_EXAMPLE })
  opcaoVoto: OpcaoVoto;
}
