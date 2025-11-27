import { Module } from '@nestjs/common';
import { AdminAuthController } from './admin-auth.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { HashingServiceProtocol } from '../common/hash/hashing.service';
import { BCryptService } from '../common/hash/bcrypt.service';
import { AdminAuthService } from './admin-auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, ConfigModule, JwtModule],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BCryptService,
    },
    AdminAuthService,
  ],
  exports: [HashingServiceProtocol, ConfigModule, JwtModule],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
