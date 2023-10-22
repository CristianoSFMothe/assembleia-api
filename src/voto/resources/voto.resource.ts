import { OpcaoVoto } from '../entities/voto.entity';
import { IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MessagerHelper } from 'src/common/messages/messages.helper';

export class RegistroVotoResource {
  @ApiProperty()
  @IsNotEmpty({ message: 'Campo CPF é obrigatório' })
  cpf: string;

  @IsNotEmpty({ message: 'Campo Opção de Voto é obrigatório' })
  @IsIn([OpcaoVoto.NAO, OpcaoVoto.SIM], {
    message: 'Campo Opção Voto só poderá ter os valores SIM ou NAO',
  })
  @ApiProperty({ example: MessagerHelper.VOTE_EXAMPLE })
  opcaoVoto: OpcaoVoto;
}
