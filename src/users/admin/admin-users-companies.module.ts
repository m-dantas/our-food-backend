import { Module } from '@nestjs/common';
import { AdminUsersCompaniesService } from './admin-users-companies.service';
import { AdminUsersCompaniesController } from './admin-users-companies.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AdminUsersCompaniesService],
  controllers: [AdminUsersCompaniesController],
})
export class AdminUsersCompaniesModule {}
