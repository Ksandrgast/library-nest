import { ApiProperty } from "@nestjs/swagger";
import { BookCategory } from "../entity/book-category.entity";

export class CategoryResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "ID категории",
  })
  id: string;

  @ApiProperty({
    example: "Фэнтези",
    description: "Название категории на русском",
  })
  titleRu: string;

  @ApiProperty({
    example: "Фэнтези",
    description: "Название категории на казахском",
  })
  titleKk: string;

  @ApiProperty({
    example: "Fantasy",
    description: "Название категории на английском",
  })
  titleEn: string;

  constructor(category: BookCategory) {
    this.id = category.id;
    this.titleRu = category.titleRu;
    this.titleKk = category.titleKk;
    this.titleEn = category.titleEn;
  }
}
