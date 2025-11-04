import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDTO } from '../dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from '../common/hash/hashing.service';
import { jwtConfig } from '../common/config/jwt.config';
import { ConfigFactory, type ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    @Inject(jwtConfig('admin').KEY)
    private readonly jwtConfiguration: ConfigType<
      ConfigFactory<JwtSignOptions>
    >,
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(body: SignInDTO) {
    try {
      const role = await this.prisma.roles.findFirst({
        where: {
          name: 'MASTER',
        },
      });

      if (!role) {
        throw new HttpException('Failed to login', HttpStatus.BAD_REQUEST);
      }

      const user = await this.prisma.users.findFirst({
        where: {
          email: body.email,
          active: true,
          company_roles: {
            some: {
              role_id: role.id,
            },
          },
        },
      });

      if (!user) {
        throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
      }

      const passwordValid = await this.hashingService.compare(
        body.password,
        user.password!,
      );

      if (!passwordValid) {
        console.log('aqui');
        throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.jwtService.signAsync(
        {
          sub: user.id,
          role: role.id,
        },
        {
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.expiresIn,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );

      return token;
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to login', HttpStatus.BAD_REQUEST);
    }
  }
}
