import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {
  @ApiProperty({
    example: "Фэнтези",
    description: "Название на русском",
  })
  @IsNotEmpty()
  @IsString()
  titleRu?: string;

  @ApiProperty({
    example: "Фэнтези",
    description: "Название на казахском",
  })
  @IsNotEmpty()
  @IsString()
  titleKk?: string;

  @ApiProperty({
    example: "Fantasy",
    description: "Название на английском",
  })
  @IsNotEmpty()
  @IsString()
  titleEn?: string;
}
