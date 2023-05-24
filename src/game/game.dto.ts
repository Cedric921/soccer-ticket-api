import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateGameDto {
  @IsUUID()
  @IsNotEmpty()
  teamOneId: string;

  @IsUUID()
  @IsNotEmpty()
  teamTwoId: string;

  @IsUUID()
  @IsNotEmpty()
  competitionId: string;

  @IsString()
  @IsNotEmpty()
  date: Date;
}

export class UpdateGameDto {
  @IsUUID()
  @IsOptional()
  teamOneId?: string;

  @IsUUID()
  @IsOptional()
  teamTwoId?: string;

  @IsUUID()
  @IsOptional()
  competitionId?: string;

  @IsString()
  @IsOptional()
  date?: Date;
}
