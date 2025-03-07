import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsDateString } from "class-validator";

export class CreateBookingDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  @IsUUID()
  bookId: string;

  @ApiProperty({ example: "2025-03-10" })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: "2025-03-20" })
  @IsDateString()
  endDate: string;
}
