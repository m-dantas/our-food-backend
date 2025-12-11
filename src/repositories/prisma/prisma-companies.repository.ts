import { Prisma, Companies } from 'generated/prisma';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompaniesRepository } from '../companies.repository';

@Injectable()
export class PrismaCompaniesRepository implements CompaniesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Companies[]> {
    const company = await this.prisma.companies.findMany();
    return company;
  }

  async findFirst(company_id: string): Promise<Companies | null> {
    const company = await this.prisma.companies.findFirst({
      where: {
        id: company_id,
      },
    });

    if (!company) {
      throw new HttpException(
        'Failed to list a company',
        HttpStatus.BAD_REQUEST,
      );
    }

    return company;
  }

  async create(data: Prisma.CompaniesCreateInput): Promise<Companies | null> {
    const company = await this.prisma.companies.create({
      data,
    });
    return company;
  }

  async update(
    company_id: string,
    data: Prisma.CompaniesUpdateInput,
  ): Promise<Companies | null> {
    const existCompany = await this.prisma.companies.findFirst({
      where: {
        id: company_id,
      },
    });

    if (!existCompany) {
      throw new HttpException(
        'Failed to create a company',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateCompany = await this.prisma.companies.update({
      where: {
        id: company_id,
      },
      data: {
        name: data.name ?? existCompany.name,
        description: data.description ?? existCompany.description,
      },
    });

    return updateCompany;
  }
}
