import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BCryptService } from './hash/bcrypt.service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BCryptService,
    },
  ],
  exports: [HashingServiceProtocol],
  controllers: [],
})
export class AuthModule {}
