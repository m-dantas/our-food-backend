import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDTO } from '../dto/signin.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { HashingServiceProtocol } from '../common/hash/hashing.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthBase } from '../auth-base.service';
import { ERoles } from 'src/common/enums/roles.enum';

@Injectable()
export class AdminAuthService extends AuthBase {
  constructor(
    configService: ConfigService,
    prisma: PrismaService,
    hashingService: HashingServiceProtocol,
    jwtService: JwtService,
  ) {
    super(configService, prisma, hashingService, jwtService);
  }

  async authenticate(body: SignInDTO) {
    try {
      const role = await this.validateRole(ERoles.ADMIN);
      const user = await this.validateUser(role.id, body.email);
      await this.validatePassword(body.password, user.password!);

      const token = await this.signAsyncToken(user.id, role.id);
      return {
        user: {
          name: user.name,
        },
        token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to login', HttpStatus.BAD_REQUEST);
    }
  }
}
