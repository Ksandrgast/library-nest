import {
  IsString,
  IsNumber,
  IsArray,
  IsUUID,
  IsOptional,
  IsNotEmpty,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
  @ApiProperty({
    example: "Сказки братьев Гримм",
    description: "Название книги",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: ["Братья Гримм"],
    description: "Авторы книги",
    type: [String],
    required: false,
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @ApiProperty({
    example: "Сборник известных сказок, собранных Братьями Гримм",
    description: "Описание книги",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1812, description: "Год издания", required: false })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiProperty({
    example: 10,
    description: "Количество доступных экземпляров",
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "ID категории книги",
    required: false,
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    example: "660e8400-e29b-41d4-a716-446655440111",
    description: "ID местоположения книги",
    required: false,
  })
  @IsNotEmpty()
  @IsUUID()
  locationId: string;
}
