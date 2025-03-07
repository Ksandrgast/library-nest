import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "../service/category.service";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryResponseDto } from "../dto/сategory-response.dto";
import { RolesGuard } from "../guards/roles.guard";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { Roles } from "../decorators/roles.decorator";
import { UserRole } from "../enums/user-role.enum";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: "Создать новую категорию" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 201, type: CategoryResponseDto })
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.categoryService.createCategory(dto);
    return new CategoryResponseDto(category);
  }

  @Get()
  @ApiOperation({ summary: "Получить все категории" })
  @ApiResponse({ status: 200, type: [CategoryResponseDto] })
  async getAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryService.getAllCategories();
    return categories.map((category) => new CategoryResponseDto(category));
  }

  @Get(":id")
  @ApiOperation({ summary: "Получить категорию по ID" })
  @ApiResponse({ status: 200, type: CategoryResponseDto })
  async getById(@Param("id") id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryService.getCategoryById(id);
    return new CategoryResponseDto(category);
  }

  @Put(":id")
  @ApiOperation({ summary: "Обновить категорию" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, type: CategoryResponseDto })
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const updatedCategory = await this.categoryService.update(id, dto);
    return new CategoryResponseDto(updatedCategory);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Удалить категорию" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 204 })
  async delete(@Param("id") id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
