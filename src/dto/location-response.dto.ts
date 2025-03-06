import { ApiProperty } from "@nestjs/swagger";
import { BookLocation } from "../entity/book-location.entity";

export class LocationResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "ID локации",
  })
  id: string;

  @ApiProperty({ example: "2", description: "Этаж" })
  floor: string;

  @ApiProperty({ example: "101", description: "Комната или склад" })
  room: string;

  @ApiProperty({ example: "5", description: "Ряд" })
  row: string;

  @ApiProperty({ example: "12A", description: "Полка или секция" })
  shelf: string;

  constructor(location: BookLocation) {
    this.id = location.id;
    this.floor = location.floor;
    this.room = location.room;
    this.row = location.row;
    this.shelf = location.shelf;
  }
}
