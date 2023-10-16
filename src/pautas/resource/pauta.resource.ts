/* eslint-disable prettier/prettier */
import { Pauta } from '../entities/pauta.entity';
export class CreatePautaResource {
  description: string;
}

export class PautaResource {
  id: string;
  description: string;
  status: string;
}

export function toRepresentation(entity: Pauta): PautaResource {
  const resource = new PautaResource();
  resource.id = entity.id;
  resource.description = entity.description;
  resource.status = entity.getStatus();

  return resource;
}

export function toDomain(resource: CreatePautaResource): Pauta {
  const pauta = new Pauta();
  pauta.description = resource.description;

  return pauta;

}
