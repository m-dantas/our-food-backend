import { IntersectionType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmptyObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { CreateCompanyDTO } from 'src/company/dto/create-company.dto';
import { Type } from 'class-transformer';

export class CreateAdminUsersCompanies extends IntersectionType(CreateUserDTO) {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(12)
  readonly password: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateCompanyDTO)
  readonly company: CreateCompanyDTO;
}
