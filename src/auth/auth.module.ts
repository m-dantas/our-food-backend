import { forwardRef, Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './common/hash/hashing.service';
import { BCryptService } from './common/hash/bcrypt.service';
import { AdminAuthModule } from './admin/admin-auth.module';

@Global()
@Module({
  imports: [forwardRef(() => AdminAuthModule)],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BCryptService,
    },
  ],
  exports: [HashingServiceProtocol, AdminAuthModule],
  controllers: [],
})
export class AuthModule {}
