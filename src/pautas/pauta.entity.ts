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
}
