import { Prisma } from 'generated/prisma';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersAdminRepository } from '../users-admin.repository';
import { HashingServiceProtocol } from 'src/auth/common/hash/hashing.service';
import { ERoles } from 'src/common/enums/roles.enum';
import { userFields } from 'src/repositories/fields/select-fields-users-companies';

@Injectable()
export class PrismaUsersAdminRepository implements UsersAdminRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(
    user: Prisma.UsersCreateInput,
    company: Prisma.CompaniesCreateInput,
  ) {
    try {
      const newUser = await this.prisma.$transaction(async (tx) => {
        const randomPassword = this.hashingService.generatePassword(12);
        console.log(randomPassword);
        const passwordHash = await this.hashingService.hash(randomPassword);
        const createdUser = await tx.users.create({
          data: {
            name: user.name,
            email: user.email,
            password: passwordHash,
            cellphone: user.cellphone,
          },
        });

        if (!createdUser)
          throw new HttpException(
            'Failed to create an user',
            HttpStatus.BAD_REQUEST,
          );

        const createdCompany = await tx.companies.create({
          data: {
            name: company.name,
            description: company.description,
          },
        });

        if (!createdCompany)
          throw new HttpException(
            'Failed to create an user',
            HttpStatus.BAD_REQUEST,
          );

        const role = await tx.roles.findFirst({
          where: {
            name: ERoles.ADMIN,
          },
        });

        if (!role)
          throw new HttpException(
            'Failed to create an user',
            HttpStatus.BAD_REQUEST,
          );

        await tx.userCompanyRoles.create({
          data: {
            company_id: createdCompany.id,
            user_id: createdUser.id,
            role_id: role.id,
          },
        });

        return createdUser;
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create an user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMany() {
    try {
      const users = await this.prisma.users.findMany({
        select: {
          ...userFields,
          company_roles: {
            omit: {
              company_id: true,
              role_id: true,
              user_id: true,
            },
            include: {
              company: true,
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      return users;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to get all users',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changeStatus(id: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new HttpException(
          'Failed to change user status',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedUser = await this.prisma.users.update({
        data: {
          active: !user.active,
        },
        where: {
          id,
        },
        select: userFields,
      });

      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to change user status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
