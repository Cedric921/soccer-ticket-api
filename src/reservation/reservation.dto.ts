import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReservationDTO {
  // @IsUUID()
  // @IsNotEmpty()
  // userId: string;

  // @IsString()
  // @IsNotEmpty()
  // date: string;

  @IsUUID()
  @IsNotEmpty()
  gameId: string;
}

export class UpdateReservationDTO {}
