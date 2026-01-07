import { Module } from '@nestjs/common';
import { AdminUsersCompaniesService } from './admin-users-companies.service';
import { AdminUsersCompaniesController } from './admin-users-companies.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { UsersAdminRepository } from 'src/repositories/users-admin.repository';
import { PrismaUsersAdminRepository } from 'src/repositories/prisma/prisma-users-admin.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    AdminUsersCompaniesService,
    {
      provide: UsersAdminRepository,
      useClass: PrismaUsersAdminRepository,
    },
  ],
  controllers: [AdminUsersCompaniesController],
})
export class AdminUsersCompaniesModule {}
