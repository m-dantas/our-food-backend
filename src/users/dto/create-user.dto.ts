import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(24)
  readonly name: string;

  @IsString()
  @MinLength(10)
  readonly cellphone: string;

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
