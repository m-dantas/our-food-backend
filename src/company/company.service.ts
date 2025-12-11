import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompaniesRepository } from 'src/repositories/companies.repository';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompaniesRepository) {}

  async getAllCompanies() {
    try {
      const company = await this.repository.findMany();
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
      const company = await this.repository.findFirst(company_id);
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
      const company = await this.repository.create(body);
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
      const updateCompany = await this.repository.update(company_id, body);

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
