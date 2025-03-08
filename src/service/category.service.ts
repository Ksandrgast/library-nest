import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookCategory } from "../entity/book-category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(BookCategory)
    private readonly categoryRepository: Repository<BookCategory>,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<BookCategory> {
    const category = this.categoryRepository.create(dto);
    return await this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<BookCategory[]> {
    return await this.categoryRepository.find({ where: { isDeleted: false } });
  }

  async getCategoryById(id: string): Promise<BookCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Категория с id ${id} не найдена`);
    }
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<BookCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    Object.assign(category, dto);
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoryRepository.update(id, {
      isDeleted: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Категория с id ${id} не найдена`);
    }
  }
}
