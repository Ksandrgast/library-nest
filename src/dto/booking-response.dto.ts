import { ApiProperty } from "@nestjs/swagger";

export class BookingResponseDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  id: string;

  @ApiProperty({ example: "1984" })
  bookTitle: string;

  @ApiProperty({ example: "2025-03-10" })
  startDate: string;

  @ApiProperty({ example: "2025-03-20" })
  endDate: string;

  @ApiProperty({ example: "ACTIVE", enum: ["UPCOMING", "ACTIVE", "EXPIRED"] })
  status: string;

  constructor(booking: any) {
    this.id = booking.id;
    this.bookTitle = booking.book.title;
    this.startDate = booking.startDate;
    this.endDate = booking.endDate;
    this.status = booking.status;
  }
}
