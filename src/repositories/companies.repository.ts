import { Prisma, Companies } from 'generated/prisma';

export abstract class CompaniesRepository {
  abstract create(data: Prisma.CompaniesCreateInput): Promise<Companies | null>;
  // abstract delete(role_id: string): Promise<Roles | null>;
  abstract update(
    company_id: string,
    data: Prisma.CompaniesUpdateInput,
  ): Promise<Companies | null>;
  abstract findMany(): Promise<Companies[]>;
  abstract findFirst(company_id: string): Promise<Companies | null>;
}
