import {
  IsDate,
  IsNotEmpty,
  IsNumber,
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

  @IsNumber()
  places: number;

  @IsUUID()
  @IsNotEmpty()
  competitionId: string;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  price: number;
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
