import { Prisma, Roles } from 'generated/prisma';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesRepository } from '../roles.repository';

@Injectable()
export class PrismaRolesRepository implements RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Roles[]> {
    return await this.prisma.roles.findMany();
  }

  async findFirst(role_id: string): Promise<Roles | null> {
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
  }

  async create(data: Prisma.RolesCreateInput): Promise<Roles | null> {
    return await this.prisma.roles.create({
      data,
    });
  }

  async delete(role_id: string): Promise<Roles | null> {
    const role = await this.prisma.roles.findFirst({
      where: { id: role_id },
    });

    if (!role) {
      throw new HttpException('Failed to delete a role', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.roles.delete({ where: { id: role_id } });
  }

  async update(
    role_id: string,
    data: Prisma.RolesUpdateInput,
  ): Promise<Roles | null> {
    const role = await this.prisma.roles.findFirst({
      where: { id: role_id },
    });

    if (!role) {
      throw new HttpException('Failed to update a role', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.roles.update({
      where: { id: role_id },
      data: {
        name: data.name ?? role?.name,
      },
    });
  }
}
