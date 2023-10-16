/* eslint-disable prettier/prettier */
import { Pauta } from './pauta.entity';
export class CreatePautaResource {
  description: string;
}

export function toDomain(resource: CreatePautaResource): Pauta {
  return {
    description: resource.description,
  }; 
}
