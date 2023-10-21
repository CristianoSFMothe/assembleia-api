/* eslint-disable prettier/prettier */
import { Pauta } from 'src/pautas/entities/pauta.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Associate } from '../associate/associate.entity';

export enum voteOption {
  SIM = 'SIM',
  NAO = 'NAO',
}
@Entity({ name: 'vote' })
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Pauta)
  @JoinColumn({ name: 'id_pauta' })
  pauta: Pauta;

  @ManyToOne(() => Associate)
  @JoinColumn({ name: 'id_associate' })
  associate: Associate;

  @Column({ name: 'vote_option' })
  voteOption: voteOption;
}
