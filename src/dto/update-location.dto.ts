import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLocationDto {
  @ApiProperty({ example: "3", description: "Этаж" })
  @IsNotEmpty()
  @IsString()
  floor?: string;

  @ApiProperty({
    example: "102",
    description: "Комната, склад или другое помещение",
  })
  @IsNotEmpty()
  @IsString()
  room?: string;

  @ApiProperty({ example: "5", description: "Ряд" })
  @IsNotEmpty()
  @IsString()
  row?: string;

  @ApiProperty({
    example: "12",
    description: "Полка или секция",
  })
  @IsNotEmpty()
  @IsString()
  shelf?: string;
}
