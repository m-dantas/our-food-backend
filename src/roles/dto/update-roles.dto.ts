import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesDTO } from './create-roles.dto';

export class UpdateRolesDTO extends PartialType(CreateRolesDTO) {}
