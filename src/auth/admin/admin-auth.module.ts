import { Global, Module } from '@nestjs/common';
import { AdminAuthController } from './admin-auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '../common/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { HashingServiceProtocol } from '../common/hash/hashing.service';
import { BCryptService } from '../common/hash/bcrypt.service';
import { AdminAuthService } from './admin-auth.service';

@Global()
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forFeature(jwtConfig('admin')),
    JwtModule.registerAsync(jwtConfig('admin').asProvider()),
  ],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BCryptService,
    },
    AdminAuthService,
  ],
  exports: [HashingServiceProtocol, JwtModule, ConfigModule],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
