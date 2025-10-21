import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('admin/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAllCompanies() {
    return await this.companyService.getAllCompanies();
  }

  @Get(':id')
  async findOneCompany(@Param('id', ParseUUIDPipe) company_id: string) {
    return await this.companyService.getFindOneCompany(company_id);
  }
}
