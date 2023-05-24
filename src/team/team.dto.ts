import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  town: string;

  @IsString()
  @IsNotEmpty()
  sigle: string;
}

export class UpdateTeamDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  town?: string;

  @IsString()
  @IsOptional()
  sigle?: string;
}
