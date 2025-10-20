import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRolesDTO } from './dto/create-roles.dto';
import { UpdateRolesDTO } from './dto/update-roles.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllRoles() {
    try {
      const roles = await this.prisma.roles.findMany();
      return roles;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to list all roles',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getFindOneRole(role_id: string) {
    try {
      const role = await this.prisma.roles.findFirst({
        where: {
          id: role_id,
        },
      });

      if (!role) {
        throw new HttpException(
          'Failed to list a single role',
          HttpStatus.BAD_REQUEST,
        );
      }

      return role;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to list a single role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createRole(bodyRole: CreateRolesDTO) {
    try {
      await this.prisma.roles.create({
        data: bodyRole,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create a role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteRole(role_id: string) {
    try {
      const role = await this.prisma.roles.findFirst({
        where: { id: role_id },
      });

      if (!role) {
        throw new HttpException(
          'Failed to delete a role',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.roles.delete({ where: { id: role_id } });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to delete a role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateRole(role_id: string, bodyRole: UpdateRolesDTO) {
    try {
      const role = await this.prisma.roles.findFirst({
        where: { id: role_id },
      });

      if (!role) {
        throw new HttpException(
          'Failed to update a role',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.roles.update({
        where: { id: role_id },
        data: {
          name: bodyRole.name ?? role?.name,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update a role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
