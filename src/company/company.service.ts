import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCompanies() {
    try {
      const company = await this.prisma.companies.findMany();
      return company;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to list all companies',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getFindOneCompany(company_id: string) {
    try {
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
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to list a company',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createCompany(body: CreateCompanyDTO) {
    try {
      const company = await this.prisma.companies.create({
        data: {
          name: body.name,
          description: body.description,
        },
      });
      return company;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create a company',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCompany(body: UpdateCompanyDTO, company_id: string) {
    try {
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
          name: body.name ?? existCompany.name,
          description: body.description ?? existCompany.description,
        },
      });

      return updateCompany;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create a company',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
