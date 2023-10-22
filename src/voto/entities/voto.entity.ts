import { Pauta } from 'src/pautas/entities/pauta.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Associado } from '../associado/associado.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Voto {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Pauta)
  @JoinColumn({ name: 'id_pauta' })
  pauta: Pauta;

  @ManyToOne(() => Associado)
  @JoinColumn({ name: 'id_associado' })
  associado: Associado;

  @Column({ name: 'voto' })
  @IsNotEmpty()
  opcaoVoto: OpcaoVoto;
}

export enum OpcaoVoto {
  SIM = 'SIM',
  NAO = 'NAO',
}
