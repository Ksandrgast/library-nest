import { IsString, IsNumber, IsArray, IsUUID, IsOptional } from "class-validator";

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    authors?: string[];

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    year?: number;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsString()
    publisher?: string;

    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @IsOptional()
    @IsUUID()
    locationId?: string;
}
