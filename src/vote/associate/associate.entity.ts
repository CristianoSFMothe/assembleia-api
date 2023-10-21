/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity({ name: 'associente' })
export class Associate {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'CPF' })
  cpf: string;
}
