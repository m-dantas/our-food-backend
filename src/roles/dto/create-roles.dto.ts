import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolesDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
