import { IntersectionType } from '@nestjs/mapped-types';
import { IsEmail, IsUUID } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class CreateUserToCompanyDTO extends IntersectionType(CreateUserDTO) {
  @IsEmail()
  readonly email: string;

  @IsUUID()
  readonly company_id: string;

  @IsUUID()
  readonly role_id: string;
}
