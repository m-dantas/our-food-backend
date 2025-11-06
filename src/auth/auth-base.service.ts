import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './common/hash/hashing.service';
import { TRoles } from 'src/common/@types/roles';
import { ConfigService } from '@nestjs/config';

export abstract class AuthBase {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
    private readonly jwtService: JwtService,
  ) {}

  protected async validateRole(role: TRoles) {
    const findedRole = await this.prisma.roles.findFirst({
      where: {
        name: role,
      },
    });

    if (!findedRole) {
      throw new HttpException('Failed to login', HttpStatus.BAD_REQUEST);
    }

    return findedRole;
  }

  protected async validateUser(role_id: string, email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        active: true,
        company_roles: {
          some: {
            role_id,
          },
        },
      },
    });

    if (!user) {
      throw new HttpException('Failed to login', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  protected async validatePassword(password: string, hashingPassword: string) {
    const passwordValid = await this.hashingService.compare(
      password,
      hashingPassword,
    );

    if (!passwordValid) {
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
    }

    return passwordValid;
  }

  protected async signAsyncToken(sub: string, role_id: string) {
    return await this.jwtService.signAsync(
      {
        sub,
        role: role_id,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
        audience: this.configService.get('JWT_AUDIENCE'),
        issuer: this.configService.get('JWT_ISSUER'),
      },
    );
  }
}
