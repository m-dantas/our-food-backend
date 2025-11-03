import { Module, forwardRef } from '@nestjs/common';
import { AdminUsersCompaniesModule } from './admin/admin-users-companies.module';

@Module({
  imports: [forwardRef(() => AdminUsersCompaniesModule)],
  exports: [AdminUsersCompaniesModule],
})
export class UsersModule {}
