import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompaniesRepository } from 'src/repositories/companies.repository';
import { PrismaCompaniesRepository } from 'src/repositories/prisma/prisma-companies.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    CompanyService,
    {
      provide: CompaniesRepository,
      useClass: PrismaCompaniesRepository,
    },
  ],
  controllers: [CompanyController],
})
export class CompanyModule {}
