export interface IJwtRegister {
  secret: string;
  audience: string;
  issuer: string;
  jwtTtl: string;
}
