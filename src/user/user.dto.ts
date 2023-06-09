import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  names?: string;

  @IsString()
  @IsOptional()
  role?: string;
}
