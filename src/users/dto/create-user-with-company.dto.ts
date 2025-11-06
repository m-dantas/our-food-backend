import { IntersectionType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { CreateCompanyDTO } from 'src/company/dto/create-company.dto';
import { Type } from 'class-transformer';

export class CreateUserWithCompanyDTO extends IntersectionType(CreateUserDTO) {
  @IsEmail()
  readonly email: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateCompanyDTO)
  readonly company: CreateCompanyDTO;
}
