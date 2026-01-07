import { Prisma } from 'generated/prisma';
import { User, UserAdminList } from './prisma/@types/users-admin';

export abstract class UsersAdminRepository {
  abstract create(
    user: Prisma.UsersCreateInput,
    company: Prisma.CompaniesCreateInput,
  ): Promise<User | null>;
  abstract findMany(): Promise<UserAdminList[] | null>;
  abstract changeStatus(id: string): Promise<User | null>;
}
