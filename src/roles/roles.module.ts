import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { RolesRepository } from 'src/repositories/roles.repository';
import { PrismaRolesRepository } from 'src/repositories/prisma/prisma-roles.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    RolesService,
    {
      provide: RolesRepository,
      useClass: PrismaRolesRepository,
    },
  ],
  controllers: [RolesController],
})
export class RolesModule {}
