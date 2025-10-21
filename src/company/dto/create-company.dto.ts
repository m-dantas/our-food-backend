import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
