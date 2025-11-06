// # Core
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// # Modules / Endpoints
import { RolesModule } from 'src/roles/roles.module';
import { CompanyModule } from 'src/company/company.module';

// # Commons
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptors';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironments } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironments,
    }),
    RolesModule,
    CompanyModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
