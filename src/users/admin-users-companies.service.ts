import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminUsersCompanies } from './dto/create-admin-users-companies.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { userFields } from './fields/select-fields-users-companies';

@Injectable()
export class AdminUsersCompaniesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async createUser(bodyUser: CreateAdminUsersCompanies) {
    try {
      const user = await this.prisma.$transaction(async (tx) => {
        const passwordHash = await this.hashingService.hash(bodyUser.password);
        const newUser = await tx.users.create({
          data: {
            name: bodyUser.name,
            email: bodyUser.email,
            password: passwordHash,
            cellphone: bodyUser.cellphone,
          },
          select: userFields,
        });

        if (!newUser)
          throw new HttpException(
            'Failed to create an user',
            HttpStatus.BAD_REQUEST,
          );

        const company = await tx.companies.create({
          data: {
            name: bodyUser.company.name,
            description: bodyUser.company.description,
          },
        });

        if (!company)
          throw new HttpException(
            'Failed to create an user',
            HttpStatus.BAD_REQUEST,
          );

        const role = await tx.roles.findFirst({
          where: {
            name: 'MASTER',
          },
        });

        if (!role)
          throw new HttpException(
            'Failed to create an user',
            HttpStatus.BAD_REQUEST,
          );

        await tx.userCompanyRoles.create({
          data: {
            company_id: company.id,
            user_id: newUser.id,
            role_id: role.id,
          },
        });

        return newUser;
      });

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create an user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.users.findMany({
        select: userFields,
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
