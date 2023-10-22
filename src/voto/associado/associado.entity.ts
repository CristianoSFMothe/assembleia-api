import { IsNotEmpty, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Associado {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  cpf: string;
}
