// # Core
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// # Modules / Endpoints
import { RolesModule } from 'src/roles/roles.module';

// # Commons
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptors';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter';

@Module({
  imports: [RolesModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
