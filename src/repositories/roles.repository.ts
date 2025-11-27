import { Prisma, Roles } from 'generated/prisma';

export abstract class RolesRepository {
  abstract create(data: Prisma.RolesCreateInput): Promise<Roles | null>;
  abstract delete(role_id: string): Promise<Roles | null>;
  abstract update(
    role_id: string,
    data: Prisma.RolesUpdateInput,
  ): Promise<Roles | null>;
  abstract findMany(): Promise<Roles[]>;
  abstract findFirst(role_id: string): Promise<Roles | null>;
}
