import { registerAs } from '@nestjs/config';
import { TJwt } from '../@types/jwt';

export const jwtConfig = (type: TJwt) =>
  registerAs(`jwt-${type}`, () => ({
    secret: process.env[`JWT_${type.toUpperCase()}_SECRET`],
    audience: process.env[`JWT_${type.toUpperCase()}_AUDIENCE`],
    issuer: process.env[`JWT_${type.toUpperCase()}_ISSUER`],
    expiresIn: process.env[`JWT_${type.toUpperCase()}_TTL`] ?? '1h',
  }));
