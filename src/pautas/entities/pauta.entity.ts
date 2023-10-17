/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pauta' })
export class Pauta {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  description: string;

  @CreateDateColumn({ name: 'date_register' })
  dateRegister?: Date;

  @Column({ type: 'timestamp', nullable: true })
  open?: Date;

  @Column({ type: 'timestamp', nullable: true })
  close?: Date;

  getStatus(): string {
    if (this.close && this.close < new Date()) {
      return StatusPauta.ENCERRADA;
    }

    if (this.open) {
      return StatusPauta.INICIADA;
    }

    return StatusPauta.NAO_INICIADA;
  }
}

enum StatusPauta {
  NAO_INICIADA = 'Sessão não iniciada',
  INICIADA = 'Sessão iniciada',
  ENCERRADA = 'Pauta encerrada',
}
